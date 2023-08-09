import { auth, config, connector, g } from '@grafbase/sdk';
import { Type } from '@grafbase/sdk/dist/src/type';

const stripe = connector.OpenAPI({
  schema:
    'https://raw.githubusercontent.com/stripe/openapi/master/openapi/spec3.json',
  url: 'https://api.stripe.com',
  headers: (headers) => {
    headers.set('Authorization', `Bearer ${g.env('STRIPE_SECRET_KEY')}`);
  },
});

const provider = auth.JWT({
  issuer: g.env('ISSUER_URL'),
  secret: g.env('NEXTAUTH_SECRET'),
});

g.datasource(stripe, { namespace: 'Stripe' });

const identityType = g.enum('IdentityType', ['CREDENTIALS', 'GOOGLE']);
const cognitoUser = g.type('CognitoUser', {
  sub: g.id(),
  stripeId: g.string().optional(),
  userId: g.string().optional(),
  email: g.email(),
  confirmationStatus: g.string(),
});

const user = g.model('User', {
  id: g.id(),
  name: g.string().optional(),
  email: g.email().unique(),
  identities: g
    .relation(() => identity)
    .list()
    .optional(),
  customer: g
    .ref(new Type('StripeCustomer'))
    .resolver('stripe/customer/byEmail'),
  cognitoUser: g.ref(cognitoUser).resolver('cognito/user/byEmail'),
});

const identity = g.model('Identity', {
  id: g.id(),
  sub: g.string().unique(),
  type: g.enumRef(identityType),
  user: g.relation(user),
});

export default config({
  schema: g,
  auth: {
    providers: [provider],
    rules: (rules) => {
      rules.private();
    },
  },
});
