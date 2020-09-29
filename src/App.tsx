import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import light from './styles/themes/light';
import dark from './styles/themes/dark';

import GlobalStyle from './styles/globals';
import Routes from './routes';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={light}>
      <GlobalStyle />
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
