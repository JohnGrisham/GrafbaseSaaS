import { Auth } from '@aws-amplify/auth';

export const configure = (root: string) => {
  const authConfig = {
    region: process.env.AWS_COGNITO_REGION as string,
    mandatorySignIn: false,
    userPoolId: process.env.COGNITO_USER_POOL_ID as string,
    userPoolWebClientId: process.env.COGNITO_USER_POOL_CLIENT_ID as string,
    oauth: {
      redirectSignIn: root,
      redirectSignOut: `${root}/api/auth/callback/cognito`,
      scope: ['email', 'profile', 'openid'],
      domain: process.env.COGNITO_DOMAIN as string,
      responseType: 'code',
    },
  };

  Auth.configure(authConfig);
};

export { Auth };
