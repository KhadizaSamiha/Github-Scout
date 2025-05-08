import { createContext } from 'react';

export const ThemeContext = createContext<{
  darkMode: boolean;
  toggleTheme: () => void;
}>({
  darkMode: false,
  toggleTheme: () => {},
});
