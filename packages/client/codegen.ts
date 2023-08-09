import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: {
    'http://127.0.0.1:4000/graphql': { headers: { ['x-api-key']: '123' } },
  },
  documents: 'src/graphql/**/**.gql',
  generates: {
    'src/types/generated.ts': {
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-react-query',
      ],
      config: {
        legacyMode: true,
        fetcher: 'graphql-request',
        scalars: {
          Email: 'string',
        },
      },
    },
  },
};

export default config;
