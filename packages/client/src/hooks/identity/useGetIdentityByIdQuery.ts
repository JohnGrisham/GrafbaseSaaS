import { graphQLClient } from '../../client';
import { Scalars, useIdentityByIdQuery } from '../../types';

export const useGetIdentityByIdQuery = (
  id: Scalars['ID'],
  headers?: Record<string, any>,
) => {
  return useIdentityByIdQuery(graphQLClient(headers), { id });
};
