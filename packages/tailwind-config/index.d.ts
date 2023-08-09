import { Config } from 'tailwindcss';

declare module 'tailwind-config/tailwind.config' {
  const config: Config;
  export default config;
}
