import 'dotenv/config';
import { defineConfig } from 'tsup';

export default defineConfig({
  esbuildOptions(options, _context) {
    if (options.define !== undefined) {
      if (process.env.AWS_COGNITO_REGION) {
        options.define['process.env.AWS_COGNITO_REGION'] = JSON.stringify(
          process.env.AWS_COGNITO_REGION,
        );
      }

      if (process.env.COGNITO_USER_POOL_ID) {
        options.define['process.env.COGNITO_USER_POOL_ID'] = JSON.stringify(
          process.env.COGNITO_USER_POOL_ID,
        );
      }

      if (process.env.COGNITO_USER_POOL_CLIENT_ID) {
        options.define['process.env.COGNITO_USER_POOL_CLIENT_ID'] = JSON.stringify(
          process.env.COGNITO_USER_POOL_CLIENT_ID,
        );
      }

      if (process.env.COGNITO_DOMAIN) {
        options.define['process.env.COGNITO_DOMAIN'] = JSON.stringify(
          process.env.COGNITO_DOMAIN,
        );
      }
    }
  },
});
