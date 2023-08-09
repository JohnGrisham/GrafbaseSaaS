import * as React from 'react';

export const useRootDomain = () => {
  const [isRootDomain, setIsRootDomain] = React.useState(false);

  React.useEffect(() => {
    if (typeof window === 'object') {
      setIsRootDomain(
        window.location.origin === process.env.NEXT_PUBLIC_ROOT_URL,
      );
    }
  }, []);

  return isRootDomain;
};
