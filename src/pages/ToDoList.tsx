import { CircularProgress, Grid2, Alert, Box, Typography } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { useChores } from '../hooks/useChores';
import { ChoreCard } from '../components/ChoreCard';

export function ToDoList() {
  const { t } = useTranslation();
  const { data, isLoading, isError } = useChores();
  const chores = data;

  if (isLoading)
    return (
      <>
        <Helmet>
          <title>{t('To-Do List')}</title>
          <link type="image/png" rel="icon" href="/icons/to_do_list.png" />
        </Helmet>
        <CircularProgress />
      </>
    );

  if (isError || !chores)
    return (
      <>
        <Helmet>
          <title>{t('Error')}</title>
          <link type="image/png" rel="icon" href="/icons/to_do_list.png" />
        </Helmet>
        <Alert severity="error">{t('Error fetching chores.')}</Alert>
      </>
    );

  return (
    <>
      <Helmet>
        <title>{t('To-Do List')}</title>
        <link type="image/png" rel="icon" href="/icons/to_do_list.png" />
      </Helmet>
      <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
        {chores && chores.length > 0 ? (
          <Box width="75vw">
            <Grid2 container spacing={2}>
              {chores.map((chore) => (
                <Grid2 key={chore.id} size={{ xs: 12, sm: 6, md: 4 }}>
                  <ChoreCard chore={chore} showDescription={false} />
                </Grid2>
              ))}
            </Grid2>
          </Box>
        ) : (
          <Typography>{t('No chores have been created yet')}</Typography>
        )}
      </Box>
    </>
  );
}

export default ToDoList;
