import { AuthContextData } from 'ui/src/providers';

export const isAuthenticatedSession = (
  data: unknown,
): data is AuthContextData => {
  const sessionArg = data as Record<string, unknown>;
  const userArg = sessionArg?.user as Record<string, any>;

  return (
    typeof sessionArg?.user === 'object' && typeof userArg.email === 'string'
  );
};
