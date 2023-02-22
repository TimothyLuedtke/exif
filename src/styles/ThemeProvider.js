import React, { useState, useCallback } from 'react';
import { useToggleCallback } from '../utils/ToggleUtils';
import ThemeContext from './ThemeContext';
import GlobalStyles from './GlobalStyles';
import Colors from './Colors';

function ThemeProvider(props) {
// ChatGPT hook to toggle between dark and light mode

//   const [isDarkMode, setIsDarkMode] = useState(false);

//   const toggleTheme = useCallback(() => {
//     setIsDarkMode(prevState => !prevState);
//   }, []);

    const [isDarkMode, toggleTheme] = useToggleCallback(false);

    

  const theme = {
    isDarkMode,
    styles: isDarkMode ? GlobalStyles.dark : GlobalStyles.light,
    toggleTheme,
    colors: isDarkMode ? Colors.dark : Colors.light,
  };

  return <ThemeContext.Provider value={theme}>{props.children}</ThemeContext.Provider>;
}

export default ThemeProvider;
