import { AppBar, Button, Toolbar, Typography, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useKeycloak } from '@react-keycloak/web';
import { LanguageSwitcher } from './LanguageSwitcher';

export function NavigationBar() {
  const { t } = useTranslation();
  const { keycloak } = useKeycloak();

  return (
    <AppBar position="static" elevation={0} sx={{ marginBottom: '15px' }}>
      <Toolbar
        sx={{
          backgroundColor: '#242424',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Link
            to="/"
            style={{
              marginRight: '50px',
              textDecoration: 'none',
              color: 'darkgrey',
              fontFamily: 'comic-sans',
              fontSize: '20px',
            }}
          >
            ChoreManager
          </Link>
          <Button variant="text" color="primary" component={Link} to="/chores" sx={{ margin: '3px' }}>
            {t('To-Do List')}
          </Button>
          {keycloak.authenticated && (
            <Button variant="text" color="primary" component={Link} to="/chores/new" sx={{ margin: '3px' }}>
              {t('Add New Chore')}
            </Button>
          )}
          <LanguageSwitcher />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {keycloak.authenticated ? (
            <>
              <Typography sx={{ marginRight: '15px', whiteSpace: 'nowrap', color: 'darkgray' }}>
                {t('Logged in as:')} <b>{keycloak.tokenParsed?.preferred_username}</b>
              </Typography>
              <Button variant="contained" color="info" onClick={() => keycloak.logout()}>
                {t('Logout')}
              </Button>
            </>
          ) : (
            <>
              <Typography sx={{ marginRight: '15px', whiteSpace: 'nowrap', color: 'darkgray' }}>
                {t("You aren't logged in")}
              </Typography>
              <Button variant="contained" color="info" onClick={() => keycloak.login()}>
                {t('Login')}
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
