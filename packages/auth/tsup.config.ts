import 'dotenv/config';
import { defineConfig } from 'tsup';

export default defineConfig({
  esbuildOptions(options, _context) {
    if (options.define !== undefined) {
      if (process.env.API_KEY) {
        options.define['process.env.API_KEY'] = JSON.stringify(
          process.env.API_KEY,
        );
      }

      if (process.env.COGNITO_CLIENT_ID) {
        options.define['process.env.COGNITO_CLIENT_ID'] = JSON.stringify(
          process.env.COGNITO_CLIENT_ID,
        );
      }

      if (process.env.COGNITO_CLIENT_SECRET) {
        options.define['process.env.COGNITO_CLIENT_SECRET'] = JSON.stringify(
          process.env.COGNITO_CLIENT_SECRET,
        );
      }

      if (process.env.COGNITO_ISSUER) {
        options.define['process.env.COGNITO_ISSUER'] = JSON.stringify(
          process.env.COGNITO_ISSUER,
        );
      }

      if (process.env.GITHUB_ID) {
        options.define['process.env.GITHUB_ID'] = JSON.stringify(
          process.env.GITHUB_ID,
        );
      }

      if (process.env.GITHUB_SECRET) {
        options.define['process.env.GITHUB_SECRET'] = JSON.stringify(
          process.env.GITHUB_SECRET,
        );
      }

      if (process.env.GOOGLE_CLIENT_ID) {
        options.define['process.env.GOOGLE_CLIENT_ID'] = JSON.stringify(
          process.env.GOOGLE_CLIENT_ID,
        );
      }

      if (process.env.GOOGLE_CLIENT_SECRET) {
        options.define['process.env.GOOGLE_CLIENT_SECRET'] = JSON.stringify(
          process.env.GOOGLE_CLIENT_SECRET,
        );
      }

      if (process.env.NEXTAUTH_URL) {
        options.define['process.env.NEXTAUTH_URL'] = JSON.stringify(
          process.env.NEXTAUTH_URL,
        );
      }

      if (process.env.STRIPE_TRIAL_PRODUCT_NAME) {
        options.define['process.env.STRIPE_TRIAL_PRODUCT_NAME'] =
          JSON.stringify(process.env.STRIPE_TRIAL_PRODUCT_NAME);
      }
    }
  },
});
