// frontend/src/App.js

import React from 'react';
import { ThemeProvider } from 'styled-components';
import { useTheme } from './hooks/useTheme';
import GlobalStyle from './styles/GlobalStyle';

const lightTheme = {
  background: '#ffffff',
  text: '#000000',
};

const darkTheme = {
  background: '#121212',
  text: '#ffffff',
};

function App({ children }) {
  const { theme } = useTheme();

  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <GlobalStyle />
      {children}
    </ThemeProvider>
  );
}

export default App;
