import { CognitoUser } from '@aws-amplify/auth';

interface User extends CognitoUser {
  [key: string]: any;
}

export const isCognitoUser = (data: unknown): data is User => {
  return Object.hasOwn(data as {}, 'authenticationFlowType');
};
