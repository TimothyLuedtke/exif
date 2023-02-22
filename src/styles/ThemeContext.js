import React from 'react';
import GlobalStyles from './GlobalStyles';

const ThemeContext = React.createContext({
  isDarkMode: false,
  styles: GlobalStyles.light,
  toggleTheme: () => {},
});

export default ThemeContext;
