import { graphQLClient } from '../../client';
import { Scalars, useUserByIdQuery } from '../../types';

export const useGetUserByIdQuery = (
  id: Scalars['ID'],
  headers?: Record<string, any>,
) => {
  return useUserByIdQuery(graphQLClient(headers), { id });
};
