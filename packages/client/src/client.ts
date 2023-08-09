import { GraphQLClient } from 'graphql-request';
import { fetchWithToken } from 'core';

export const graphQLClient = (headers?: Record<string, any>) => {
  return new GraphQLClient(process.env.API_ENDPOINT as string, {
    fetch: fetchWithToken,
    headers,
    mode: 'cors',
  });
};
