import { Auth } from '@aws-amplify/auth';

export const configure = async () => {
  try {
    const authConfig = {
      region: process.env.AWS_COGNITO_REGION as string,
      mandatorySignIn: false,
      userPoolId: process.env.COGNITO_USER_POOL_ID as string,
      userPoolWebClientId: process.env.COGNITO_USER_POOL_CLIENT_ID as string,
      oauth: {
        redirectSignIn: process.env.NEXT_PUBLIC_ROOT_URL as string,
        redirectSignOut: `${process.env.NEXT_PUBLIC_ROOT_URL}/api/auth/callback/cognito`,
        scope: ['email', 'profile', 'openid'],
        domain: process.env.COGNITO_DOMAIN as string,
        responseType: 'code',
      },
    };

    await Auth.configure(authConfig);

    return true;
  } catch (err: any) {
    console.error(err.message);
    return false;
  }
};

export { Auth };
