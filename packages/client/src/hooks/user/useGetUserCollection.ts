import { graphQLClient } from '../../client';
import { useUserCollectionQuery, QueryUserCollectionArgs } from '../../types';

export const useGetUserCollection = (
  { first = 100, ...args }: QueryUserCollectionArgs,
  headers?: Record<string, any>,
) => {
  return useUserCollectionQuery(graphQLClient(headers), { ...args, first });
};
