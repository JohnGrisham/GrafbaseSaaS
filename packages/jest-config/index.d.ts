import type { Config } from 'jest';

declare module 'jest-config' {
  const config: Config;
  export default config;
}
