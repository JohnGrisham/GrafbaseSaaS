import React, { createContext } from 'react';

export interface LoadingProviderProps {
  children: React.ReactNode;
}

export interface LoadingProviderValue {
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const LoadingContext = createContext<LoadingProviderValue>({
  loading: false,
  setLoading: () => {},
});

export const LoadingProvider: React.FC<LoadingProviderProps> = ({
  children,
}) => {
  const [loading, setLoading] = React.useState(false);

  return (
    <LoadingContext.Provider value={{ loading, setLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};
