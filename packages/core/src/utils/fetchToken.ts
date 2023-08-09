export const fetchToken = async (credentials?: RequestCredentials) => {
  // @ts-ignore
  return fetch(`${process.env.NEXT_PUBLIC_ROOT_URL}/api/auth/token`, {
    credentials,
  }).then((res) => res.json());
};
