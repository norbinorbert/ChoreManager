import { AppBar, Button, Toolbar } from '@mui/material';
import { Link } from 'react-router-dom';

export function NavigationBar() {
  return (
    <AppBar position="static">
      <Toolbar sx={{ backgroundColor: '#242424' }}>
        <Link to={'/'}>ChoreManager</Link>
        <Button variant="contained" color="primary" component={Link} to="/chores">
          To-Do List
        </Button>
        <Button variant="contained" color="primary" component={Link} to="/chores/new">
          Add New Chore
        </Button>
      </Toolbar>
    </AppBar>
  );
}
