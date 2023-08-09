import { graphQLClient } from '../../client';
import { Scalars, isEmail, useUserSubscriptionsQuery } from '../../types';

export const useGetUserSubscriptions = (
  email: Scalars['Email'],
  headers?: Record<string, any>,
) => {
  if (!isEmail(email)) {
    throw new Error(`${email} is an invalid email address!`);
  }

  return useUserSubscriptionsQuery(graphQLClient(headers), { email });
};
