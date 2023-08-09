import type { User } from 'client';
import {
  AdminGetUserCommand,
  CognitoIdentityProviderClient,
} from '@aws-sdk/client-cognito-identity-provider';

export default async function Resolver(user: User) {
  try {
    const { email } = user;

    if (!email) return null;

    const cognito = new CognitoIdentityProviderClient({
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY as string,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
      },
      region: process.env.AWS_REGION || 'us-east-1',
    });

    const command = new AdminGetUserCommand({
      UserPoolId: process.env.COGNITO_USER_POOL_ID,
      Username: email,
    });
    const result = await cognito.send(command);

    return {
      sub: result.Username,
      confirmationStatus: result.UserStatus,
      email: result.UserAttributes?.find(({ Name }) => Name === 'email')?.Value,
      stripeId: result.UserAttributes?.find(
        ({ Name }) => Name === 'custom:stripeId',
      )?.Value,
      userId: result.UserAttributes?.find(
        ({ Name }) => Name === 'custom:userId',
      )?.Value,
    };
  } catch (ex: any) {
    if (ex.code === 'UserNotFoundException') {
      return null;
    }
    console.error(ex);
  }
}
