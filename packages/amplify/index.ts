import { Auth } from '@aws-amplify/auth';
import { Logger } from '@aws-amplify/core';

export const configure = async () => {
  try {
    Logger.LOG_LEVEL = 'DEBUG';
    console.log('initializing auth...');
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
    console.log('auth initialized');
    return true;
  } catch (err: any) {
    console.error(err.message);
    return false;
  }
};

export { Auth };
