import { CircularProgress, Grid2 } from '@mui/material';
import { ChoreCard } from '../components/ChoreCard';
import { useChore } from '../hooks/useChore';

export function ChoreDetailsPage() {
  const id = window.location.pathname.split('/').pop();
  const { chore, isLoading } = useChore(id);

  if (isLoading) return <CircularProgress />;

  return (
    <Grid2>
      <ChoreCard chore={chore} showDescription={true} />
    </Grid2>
  );
}
