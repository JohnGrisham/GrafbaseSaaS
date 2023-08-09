import { graphQLClient } from '../../client';
import { Scalars, useUserByEmailQuery } from '../../types';

export const useGetUserByEmailQuery = (
  email: Scalars['Email'],
  headers?: Record<string, any>,
) => {
  return useUserByEmailQuery(graphQLClient(headers), { email });
};
