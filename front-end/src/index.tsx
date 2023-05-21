import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { MantineProvider } from '@mantine/core';

ReactDOM.render(
  <React.StrictMode>
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <App />
    </MantineProvider>
  </React.StrictMode>,
  document.getElementById('root') as HTMLElement
);
