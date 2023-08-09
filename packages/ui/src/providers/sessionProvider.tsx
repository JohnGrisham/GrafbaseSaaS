import * as React from 'react';
import {
  SessionContextValue,
  SessionProviderProps,
  SessionProvider as NextAuthSessionProvider,
  signIn,
  useSession,
} from 'next-auth/react';
import { isAuthenticatedSession, isAuthScreen } from 'core';
import { Session } from 'next-auth';

export interface AuthenticatedUser {
  email: string;
  name?: string | null;
  image?: string | null;
}

export interface AuthContextData extends Omit<Session, 'user'> {
  user: AuthenticatedUser;
}

export interface AuthenticatedSessionContextProps {
  context: Omit<SessionContextValue, 'data' | 'update'> & {
    data: AuthContextData;
  };
}

export interface AuthenticatedSessionProviderProps
  extends SessionProviderProps {
  AuthSessionProvider?: React.FC<AuthenticatedSessionProviderProps>;
  requiresAuth?: boolean;
}

export const AuthenticatedSessionContext =
  React.createContext<AuthenticatedSessionContextProps>({
    context: {
      data: {} as AuthContextData,
      status: 'unauthenticated',
    },
  });

const withNextSessionProvider = ({
  AuthSessionProvider,
  children,
  requiresAuth = true,
  ...props
}: AuthenticatedSessionProviderProps) => (
  <NextAuthSessionProvider {...props}>
    {requiresAuth && AuthSessionProvider ? (
      <AuthSessionProvider {...props}>{children}</AuthSessionProvider>
    ) : (
      children
    )}
  </NextAuthSessionProvider>
);

const AuthenticatedSessionProvider: React.FC<
  AuthenticatedSessionProviderProps
> = ({ children }) => {
  const { data: session, status } = useSession();
  const [authStatus, setAuthStatus] = React.useState(status);
  const isAuthSession = isAuthenticatedSession(session);

  React.useEffect(() => {
    if (!isAuthSession && !isAuthScreen() && status !== 'loading') {
      setAuthStatus('loading');
      signIn();
    } else {
      setAuthStatus(status);
    }
  }, [authStatus, isAuthSession, status]);

  if (authStatus === 'loading') {
    return <div>Loading...</div>;
  }

  if (!isAuthScreen() && authStatus === 'unauthenticated') {
    return null;
  }

  if (isAuthSession) {
    return (
      <AuthenticatedSessionContext.Provider
        value={{ context: { data: session, status: 'authenticated' } }}
      >
        {children}
      </AuthenticatedSessionContext.Provider>
    );
  }

  return <>{children}</>;
};

export const SessionProvider: React.FC<
  Omit<AuthenticatedSessionProviderProps, 'AuthSessionProvider'>
> = (props) =>
  withNextSessionProvider({
    AuthSessionProvider: AuthenticatedSessionProvider,
    ...props,
  });
