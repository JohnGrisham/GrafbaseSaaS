import { ThemeContext } from '../providers';
import { useContext } from 'react';

export const useThemeContext = () => useContext(ThemeContext);
