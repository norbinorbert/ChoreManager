// eslint-disable-next-line import/no-unresolved
import { registerSW } from 'virtual:pwa-register';
import { createRoot } from 'react-dom/client';
import '../public/styles/index.css';
import { HelmetProvider } from 'react-helmet-async';
import { I18nextProvider } from 'react-i18next';
import { ReactKeycloakProvider } from '@react-keycloak/web';
import App from './App';
import i18n from './i18n';
import keycloak from './keycloak';

registerSW();

createRoot(document.getElementById('root')!).render(
  <HelmetProvider>
    <I18nextProvider i18n={i18n}>
      <ReactKeycloakProvider authClient={keycloak}>
        <App />
      </ReactKeycloakProvider>
    </I18nextProvider>
  </HelmetProvider>,
);
