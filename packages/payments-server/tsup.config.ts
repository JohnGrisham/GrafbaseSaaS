import 'dotenv/config';
import { defineConfig } from 'tsup';

export default defineConfig({
  esbuildOptions(options, _context) {
    if (options.define !== undefined) {
      if (process.env.STRIPE_SECRET_KEY) {
        options.define['process.env.STRIPE_SECRET_KEY'] = JSON.stringify(
          process.env.STRIPE_SECRET_KEY,
        );
      }

      if (process.env.STRIPE_WEBHOOK_SECRET) {
        options.define['process.env.STRIPE_WEBHOOK_SECRET'] = JSON.stringify(
          process.env.STRIPE_WEBHOOK_SECRET,
        );
      }
    }
  },
});
