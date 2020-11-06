import { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const LOCAL_STORAGE_KEY = 'djp:theme';
const { localStorage } = window;

export const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [isDarkTheme, setIsDarkTheme] = useState();

  useEffect(() => {
    const localTheme = localStorage.getItem(LOCAL_STORAGE_KEY);

    if (localTheme) {
      setIsDarkTheme(localTheme === 'dark');
    } else {
      setIsDarkTheme(
        window.matchMedia
          && window.matchMedia('(prefers-color-scheme: dark)').matches,
      );
    }
  }, []);

  useEffect(() => {
    document.body.dataset.theme = isDarkTheme ? 'dark' : 'light';
  }, [isDarkTheme]);

  function toggle() {
    setIsDarkTheme(!isDarkTheme);
    localStorage.setItem(LOCAL_STORAGE_KEY, isDarkTheme ? 'light' : 'dark');
  }

  return (
    <ThemeContext.Provider value={{ isDarkMode: isDarkTheme, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
