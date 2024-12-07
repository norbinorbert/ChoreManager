import { AppBar, Button, Toolbar } from '@mui/material';
import { Link } from 'react-router-dom';

export function NavigationBar() {
  return (
    <AppBar position="static" elevation={0} sx={{ marginBottom: '15px' }}>
      <Toolbar sx={{ backgroundColor: '#242424' }}>
        <Link
          to={'/'}
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
          To-Do List
        </Button>
        <Button variant="text" color="primary" component={Link} to="/chores/new" sx={{ margin: '3px' }}>
          Add New Chore
        </Button>
      </Toolbar>
    </AppBar>
  );
}
