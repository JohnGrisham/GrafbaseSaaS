import React, { createContext } from 'react';
import { ThemeConfig } from 'tailwindcss/types/config';
// @ts-ignore
import { theme } from 'tailwind-config/tailwind.config';

interface TailwindThemeConfig extends Partial<ThemeConfig> {
  colors: Record<string, any>;
}

export interface ThemeProviderValue extends TailwindThemeConfig {
  isDarkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface ThemeProviderProps {
  children: React.ReactNode;
  theme: TailwindThemeConfig;
}

export const ThemeContext = createContext<ThemeProviderValue>(theme);

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  theme,
}) => {
  const [isDarkMode, setIsDarkMode] = React.useState(false);

  const setDarkMode = React.useCallback(
    (darkMode: boolean | ((darkMode: boolean) => boolean)) => {
      let darkModeValue = false;

      if (typeof darkMode === 'boolean') {
        darkModeValue = darkMode;
        setIsDarkMode(darkMode);
      } else {
        darkModeValue = darkMode(isDarkMode);
        setIsDarkMode(darkModeValue);
      }

      if (typeof window === 'object') {
        window.localStorage.setItem('darkMode', JSON.stringify(darkModeValue));
      }
    },
    [isDarkMode],
  );

  React.useEffect(() => {
    if (typeof document !== 'object' || typeof window !== 'object') {
      return;
    }

    const darkModeLocalStorage: boolean = JSON.parse(
      window.localStorage.getItem('darkMode') ?? 'false',
    );
    setIsDarkMode(darkModeLocalStorage);

    if (darkModeLocalStorage) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <ThemeContext.Provider value={{ ...theme, isDarkMode, setDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};
