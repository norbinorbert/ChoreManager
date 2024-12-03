import { Link } from 'react-router-dom';
import { CircularProgress, Button, Grid2 } from '@mui/material';
import { useChores } from '../hooks/useChores';
import { ChoreCard } from '../components/ChoreCard';

export function ToDoList() {
  const { chores, isLoading } = useChores();

  if (isLoading) return <CircularProgress />;

  return (
    <div>
      <Button variant="contained" color="primary" component={Link} to="/chores/new">
        Add New Chore
      </Button>
      <Grid2 container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        {chores.map((chore) => (
          <Grid2 key={chore.id} spacing={4}>
            <ChoreCard chore={chore} showDescription={false} />
          </Grid2>
        ))}
      </Grid2>
    </div>
  );
}

export default ToDoList;
