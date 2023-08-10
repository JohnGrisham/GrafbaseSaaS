export const fetchToken = async (credentials?: RequestCredentials) => {
  // @ts-ignore
  return fetch(new URL('/api/auth/token', process.env.NEXT_PUBLIC_ROOT_URL), {
    credentials,
  }).then((res) => res.json());
};
