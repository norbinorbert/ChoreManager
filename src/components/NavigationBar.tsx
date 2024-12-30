import { AppBar, Button, Toolbar } from '@mui/material';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { LanguageSwitcher } from './LanguageSwitcher';

export function NavigationBar() {
  const { t } = useTranslation();

  return (
    <AppBar position="static" elevation={0} sx={{ marginBottom: '15px' }}>
      <Toolbar sx={{ backgroundColor: '#242424' }}>
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
        <Button variant="text" color="primary" component={Link} to="/chores/new" sx={{ margin: '3px' }}>
          {t('Add New Chore')}
        </Button>
        <LanguageSwitcher />
      </Toolbar>
    </AppBar>
  );
}
