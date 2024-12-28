// eslint-disable-next-line import/no-unresolved
import { registerSW } from 'virtual:pwa-register';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '../public/styles/index.css';
import { HelmetProvider } from 'react-helmet-async';
import App from './App';

registerSW();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </StrictMode>,
);
