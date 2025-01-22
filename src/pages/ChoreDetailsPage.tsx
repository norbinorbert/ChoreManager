import { Alert, CircularProgress, Grid2 } from '@mui/material';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { ChoreCard } from '../components/ChoreCard';
import { useChore } from '../hooks/useChores';

export function ChoreDetailsPage() {
  const { t } = useTranslation();
  const { id } = useParams();
  const { data, isLoading, isError } = useChore(Number(id));
  const chore = data;

  if (isLoading)
    return (
      <>
        <Helmet>
          <title>
            {t('Chore')}#{id}
          </title>
          <link type="image/png" rel="icon" href="/icons/view_chore.png" />
        </Helmet>
        <CircularProgress />
      </>
    );

  if (isError || !chore)
    return (
      <>
        <Helmet>
          <title>{t('Error')}</title>
          <link type="image/png" rel="icon" href="/icons/view_chore.png" />
        </Helmet>
        <Alert severity="error">{t('Error fetching chore.')}</Alert>
      </>
    );

  return (
    <>
      <Helmet>
        <title>
          {t('Chore')}#{id}
        </title>
        <link type="image/png" rel="icon" href="/icons/view_chore.png" />
      </Helmet>
      <Grid2 maxWidth="75vw" display="inline-block">
        <ChoreCard chore={chore} showDescription />
      </Grid2>
    </>
  );
}
