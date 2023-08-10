export const fetchToken = async (credentials?: RequestCredentials) => {
  // @ts-ignore
  return fetch('/api/auth/token', {
    credentials,
  }).then((res) => res.json());
};
