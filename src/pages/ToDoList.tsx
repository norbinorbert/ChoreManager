import { CircularProgress, Grid2, Alert, Box } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { useChores } from '../hooks/useChores';
import { ChoreCard } from '../components/ChoreCard';

export function ToDoList() {
  const { data, isLoading, isError } = useChores();
  const chores = data;

  if (isLoading) return <CircularProgress />;

  if (isError || !chores) return <Alert severity="error">Error fetching chores.</Alert>;

  return (
    <>
      <Helmet>
        <title>To-Do List</title>
      </Helmet>
      <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
        <Box width="75vw">
          <Grid2 container spacing={2}>
            {chores.map((chore) => (
              <Grid2 key={chore.id} size={{ xs: 12, sm: 6, md: 4 }}>
                <ChoreCard chore={chore} showDescription={false} />
              </Grid2>
            ))}
          </Grid2>
        </Box>
      </Box>
    </>
  );
}

export default ToDoList;
