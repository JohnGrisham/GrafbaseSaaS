import 'dotenv/config';
import { defineConfig } from 'tsup';

export default defineConfig({
  entry: {
    index: 'src/index.ts',
    server: 'src/server.ts',
  },
  external: ['react'],
  format: ['esm', 'cjs'],
  dts: true,
  esbuildOptions(options, _context) {
    if (options.define !== undefined) {
      if (options.define && process.env.API_ENDPOINT) {
        options.define = {
          'process.env.API_ENDPOINT': JSON.stringify(process.env.API_ENDPOINT),
        };
      }
    }
  },
});
