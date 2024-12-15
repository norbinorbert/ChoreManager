import { Alert, CircularProgress, Grid2 } from '@mui/material';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ChoreCard } from '../components/ChoreCard';
import { useChore } from '../hooks/useChores';

export function ChoreDetailsPage() {
  const { id } = useParams();
  const { data, isLoading, isError } = useChore(Number(id));
  const chore = data;

  if (isLoading) return <CircularProgress />;

  if (isError || !chore) return <Alert severity="error">Error fetching chore.</Alert>;

  return (
    <>
      <Helmet>
        <title>Chore #{id}</title>
        <link type="image/png" rel="icon" href="/src/assets/view_chore.png" />
      </Helmet>
      <Grid2 maxWidth="75vw" display="inline-block">
        <ChoreCard chore={chore} showDescription />
      </Grid2>
    </>
  );
}
