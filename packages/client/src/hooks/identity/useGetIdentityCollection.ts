import { graphQLClient } from '../../client';
import {
  useIdentityCollectionQuery,
  QueryIdentityCollectionArgs,
} from '../../types';

export const useGetIdentityCollection = (
  { first = 100, ...args }: QueryIdentityCollectionArgs,
  headers?: Record<string, any>,
) => {
  return useIdentityCollectionQuery(graphQLClient(headers), { ...args, first });
};
