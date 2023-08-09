import { useQuery as useRQquery, QueryKey, UseQueryOptions } from 'react-query';
import { graphQLClient } from '../client';
import { gql } from 'graphql-request';

export const useQuery = <
  TQueryFnData,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
>(
  key: TQueryKey,
  query: string,
  variables?: Record<string, any>,
  options?: Omit<
    UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>,
    'queryKey'
  > & { headers?: Record<string, any> },
) => {
  return useRQquery<TQueryFnData, TError, TData, TQueryKey>(
    key,
    async () => {
      const response = await graphQLClient(options?.headers).request<
        TQueryFnData,
        {}
      >(
        gql`
          ${query}
        `,
        variables,
      );

      return response;
    },
    options,
  );
};

export { gql };
