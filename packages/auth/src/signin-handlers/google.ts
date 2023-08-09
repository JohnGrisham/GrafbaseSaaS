import type { IdentityType } from 'client';
import { createIdentity, createUser, getUserByEmail } from '../utils';

export const googleSigninHandler = async (
  sub: string,
  email: string,
  name: string,
) => {
  const gqlUserRecord = await getUserByEmail(email);
  const googleIdentity = gqlUserRecord?.identities?.edges?.find(
    (edge) => edge?.node.type === 'GOOGLE',
  );

  if (!gqlUserRecord) {
    await createUser(email, sub, 'GOOGLE' as IdentityType, name);
  } else if (gqlUserRecord && !googleIdentity) {
    await createIdentity(sub, gqlUserRecord.id, 'GOOGLE' as IdentityType);
  }
};
