// eslint-disable-next-line import/no-unresolved
import Keycloak from 'keycloak-js';

const keycloak = new Keycloak({
  url: 'http://localhost:8180/',
  realm: 'spa',
  clientId: 'spa',
});

export default keycloak;
