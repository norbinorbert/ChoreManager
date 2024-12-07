import { CircularProgress, Grid2 } from '@mui/material';
import { ChoreCard } from '../components/ChoreCard';
import { useChore } from '../hooks/useChores';
import { useParams } from 'react-router-dom';

export function ChoreDetailsPage() {
  const { id } = useParams();
  const chore = useChore(Number(id)).data;

  if (!chore) return <CircularProgress />;

  return (
    <Grid2>
      <ChoreCard chore={chore} showDescription={true} />
    </Grid2>
  );
}
