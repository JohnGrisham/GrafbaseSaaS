import type { UserByEmailQuery, UserByEmailQueryVariables } from 'client';
import {
  Account,
  CallbacksOptions,
  CookiesOptions,
  EventCallbacks,
  Profile,
} from 'next-auth';
import CredentialsProvider, {
  CredentialsConfig,
} from 'next-auth/providers/credentials';
import GithubProvider, { GithubProfile } from 'next-auth/providers/github';
import GoogleProvider, { GoogleProfile } from 'next-auth/providers/google';
import {
  credentialsSigninHandler,
  googleSigninHandler,
} from './signin-handlers';
import { graphQLClient } from 'client';
import { JWTOptions } from 'next-auth/jwt';
import { OAuthUserConfig } from 'next-auth/providers';
import { Auth } from '@aws-amplify/auth';
import { JWT } from 'next-auth/jwt';
import { constructStripe } from 'payments-server';
import { gql } from 'graphql-request';
import jsonwebtoken from 'jsonwebtoken';
import { isCognitoUser } from 'core';

const hostName = new URL(process.env.NEXTAUTH_URL as string).hostname;
const useSecureCookies = process.env.NEXTAUTH_URL?.startsWith('https://');
const cookiePrefix = useSecureCookies ? '__Secure-' : '';

export const crossDomainCookies: Partial<CookiesOptions> = {
  sessionToken: {
    name: `${cookiePrefix}next-auth.session-token`,
    options: {
      httpOnly: true,
      sameSite: 'lax',
      path: '/',
      domain: hostName == 'localhost' ? hostName : '.' + hostName,
      secure: useSecureCookies,
    },
  },
};

export const jwt: Partial<JWTOptions> = {
  encode: ({ secret, token }) => {
    const encodedToken = jsonwebtoken.sign(
      {
        ...token,
        iss: process.env.ISSUER_URL as string,
        exp: Math.floor(Date.now() / 1000) + 60 * 60,
      },
      secret,
    );
    return encodedToken;
  },
  decode: async ({ secret, token }) => {
    const decodedToken = jsonwebtoken.verify(token!, secret);
    return decodedToken as JWT;
  },
};

export const credentials = (config?: CredentialsConfig) =>
  CredentialsProvider({
    // The name to display on the sign in form (e.g. "Sign in with...")
    name: 'Credentials',
    // The credentials is used to generate a suitable form on the sign in page.
    // You can specify whatever fields you are expecting to be submitted.
    // e.g. domain, username, password, 2FA token, etc.
    // You can pass any HTML attribute to the <input> tag through the object.
    credentials: {
      username: {
        label: 'Email',
        type: 'email',
        placeholder: 'johndoe@example.com',
      },
      password: { label: 'Password', type: 'password' },
    },
    async authorize(credentials) {
      try {
        const { username = '', password = '' } = { ...credentials };

        const cognitoUser = await Auth.signIn({
          username,
          password,
        });

        const user = Object.assign(cognitoUser, {
          ...cognitoUser,
          id: cognitoUser.getUsername(),
          email: cognitoUser.attributes.email,
          name: cognitoUser.attributes.name,
        });

        return new Promise((res) => res(user as any));
      } catch (err: any) {
        console.log(err.message);
        return err;
      }
    },
    ...config,
  });

export const google = (config?: OAuthUserConfig<GoogleProfile>) =>
  GoogleProvider({
    clientId: process.env.GOOGLE_CLIENT_ID as string,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    ...config,
  });

export const github = (config?: OAuthUserConfig<GithubProfile>) =>
  GithubProvider({
    clientId: process.env.GITHUB_ID as string,
    clientSecret: process.env.GITHUB_SECRET as string,
    ...config,
  });

export const callbacks: Partial<CallbacksOptions<Profile, Account>> = {
  async signIn({ account, profile, user }) {
    try {
      const email = user.email;
      const name = user.name ?? '';

      if (!email) {
        return false;
      }

      switch (account?.provider) {
        case 'credentials':
          await credentialsSigninHandler(user, email, name);
          break;
        case 'google': {
          const sub = profile?.sub ?? `GSTUB_${user.id}`;
          await googleSigninHandler(sub, email, name);
          break;
        }
        default:
          await credentialsSigninHandler(user, email, name);
      }

      return true;
    } catch (err: any) {
      console.error(err.message);
      return false;
    }
  },
  async jwt({ account, user, token }) {
    if (user) {
      let currentUser = user as unknown;
      let tokenResponse: JWT = token;

      if (isCognitoUser(currentUser) && account?.type === 'credentials') {
        const session = currentUser.getSignInUserSession();

        tokenResponse = {
          ...token,
          sub: currentUser.id,
          email: currentUser.email,
          accessToken: session?.getAccessToken().getJwtToken(),
          refreshToken: session?.getRefreshToken().getToken(),
        };
      }

      return Promise.resolve(tokenResponse);
    }

    return Promise.resolve(token);
  },
  async session({ session, token: { sub, email, name, picture } }) {
    if (sub) {
      session.user = { email, name, image: picture };
    }

    return Promise.resolve(session);
  },
};

export const events: EventCallbacks = {
  createUser: () => {},
  linkAccount: () => {},
  session: () => {},
  signIn: async ({ account, user }) => {
    let stripeId = '';
    const stripe = constructStripe();

    const { email = undefined, name = undefined } = user;

    if (!email) {
      return;
    }

    const { user: userRecord } = await graphQLClient({
      'x-api-key': process.env.API_KEY as string,
    }).request<UserByEmailQuery, UserByEmailQueryVariables>(
      gql`
        query GetUserByEmail($email: Email!) {
          user(by: { email: $email }) {
            id
            customer {
              id
            }
          }
        }
      `,
      {
        email,
      },
    );

    if (!userRecord?.customer) {
      const cognitoUser = isCognitoUser(user);
      const sub = cognitoUser ? user.id : account?.providerAccountId ?? '';

      const newStripeCustomer = await stripe.customers.create({
        name: name ?? '',
        email,
        metadata: {
          sub,
          userId: userRecord?.id ?? '',
        },
      });
      stripeId = newStripeCustomer.id;

      const [trialProduct] = (
        await stripe.products.search({
          query: `name~'${process.env.STRIPE_TRIAL_PRODUCT_NAME ?? ''}'`,
        })
      ).data;
      const price =
        typeof trialProduct.default_price === 'string'
          ? trialProduct.default_price
          : trialProduct.default_price?.unit_amount_decimal ?? '0';

      await stripe.subscriptions.create({
        customer: newStripeCustomer.id,
        items: [{ price, quantity: 1 }],
        trial_period_days: 7,
      });
    } else {
      stripeId = userRecord.customer.id;
    }

    if (isCognitoUser(user) && userRecord) {
      await Auth.updateUserAttributes(user, {
        'custom:userId': userRecord.id,
        'custom:stripeId': stripeId,
      });
    }
  },
  signOut: async ({ token: _token, session: _session }) => {
    await fetch(
      `${process.env.NEXTAUTH_URL}/api/auth/signout?callbackUrl=/api/auth/session`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: await fetch(`${process.env.NEXTAUTH_URL}/api/auth/csrf`).then(
          (rs) => rs.text(),
        ),
      },
    );

    _token = {};
    _session = {} as any;
  },
  updateUser: () => {},
};

export const providers = [credentials(), google(), github()];
