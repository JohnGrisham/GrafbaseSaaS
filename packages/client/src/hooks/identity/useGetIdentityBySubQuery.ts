import { graphQLClient } from '../../client';
import { Scalars, useIdentityBySubQuery } from '../../types';

export const useGetIdentityBySubQuery = (
  sub: Scalars['String'],
  headers?: Record<string, any>,
) => {
  return useIdentityBySubQuery(graphQLClient(headers), { sub });
};
