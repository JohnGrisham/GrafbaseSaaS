import '@fortawesome/fontawesome-svg-core/styles.css';
import '../styles/globals.css';
import 'ui/styles.css';
import type { AppProps } from 'next/app';
import { Body, LoadingProvider, SessionProvider, ThemeProvider } from 'ui';
import { StripeClient } from 'payments-client';
import dynamic from 'next/dynamic';
// @ts-ignore
import { theme } from 'tailwind-config/tailwind.config';

const GraphqlClient = dynamic(
  () => import('client').then(({ Client }) => Client),
  {
    ssr: false,
  },
);
const Navbar = dynamic(() => import('ui').then(({ Navbar }) => Navbar), {
  ssr: false,
});

const ROOT = process.env.NEXT_PUBLIC_ROOT_URL as string;
const STRIPE_PUBLISHABLE_KEY =
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY_LIVE ??
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ??
  '';

export interface MyAppProps extends AppProps {
  Component: any;
}

export default function MyApp({ Component, pageProps }: MyAppProps) {
  return (
    <SessionProvider requiresAuth={Component.auth}>
      <GraphqlClient>
        <StripeClient publishableKey={STRIPE_PUBLISHABLE_KEY}>
          <ThemeProvider theme={theme}>
            <LoadingProvider>
              <Navbar
                logoProps={{
                  title: 'SaaS',
                  src: 'https://flowbite.com/docs/images/logo.svg',
                  href: ROOT,
                }}
                navItems={[
                  { id: 'home', href: '/', title: 'Home', type: 'simple' },
                  {
                    id: 'about',
                    href: '/about',
                    title: 'About',
                    type: 'simple',
                  },
                ]}
                signoutOptions={{
                  callbackUrl: `${ROOT}/auth/signin`,
                  redirect: true,
                }}
              />
              <Body>
                <Component {...pageProps} />
              </Body>
            </LoadingProvider>
          </ThemeProvider>
        </StripeClient>
      </GraphqlClient>
    </SessionProvider>
  );
}
