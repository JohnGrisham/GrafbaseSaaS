import type { IdentityType } from 'client';
import { createIdentity, createUser, getUserByEmail } from '../utils';
import { User } from 'next-auth';
import { isCognitoUser } from 'core';

export const credentialsSigninHandler = async (
  user: User,
  email: string,
  name: string,
) => {
  const gqlUserRecord = await getUserByEmail(email);
  const cognitoUser = isCognitoUser(user);
  const passwordIdentity = gqlUserRecord?.identities?.edges?.find(
    (edge) => edge?.node.type === 'CREDENTIALS',
  );

  if (!gqlUserRecord && cognitoUser) {
    await createUser(
      email,
      user.id,
      'CREDENTIALS' as IdentityType,
      name,
    );
  } else if (gqlUserRecord && !passwordIdentity && cognitoUser) {
    await createIdentity(
      user.id,
      gqlUserRecord.id,
      'CREDENTIALS' as IdentityType,
    );
  }
};
