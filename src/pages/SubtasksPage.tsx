import { Helmet } from 'react-helmet-async';
import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useKeycloak } from '@react-keycloak/web';
import { Alert, Box, Button, CircularProgress, Grid2, Typography } from '@mui/material';
import { useSubtasks } from '../hooks/useSubtasks';
import { SubtaskCard } from '../components/SubtaskCard';

export function SubtasksPage() {
  const { keycloak } = useKeycloak();
  const { t } = useTranslation();
  const { choreId } = useParams();
  const { data, isLoading, isError } = useSubtasks(Number(choreId));
  const subtasks = data;

  if (isLoading)
    return (
      <>
        <Helmet>
          <title>
            {t('Subtasks for chore')}#{choreId}
          </title>
          <link type="image/png" rel="icon" href="/icons/view_chore.png" />
        </Helmet>
        <CircularProgress />
      </>
    );

  if (isError)
    return (
      <>
        <Helmet>
          <title>{t('Error')}</title>
          <link type="image/png" rel="icon" href="/icons/view_chore.png" />
        </Helmet>
        <Alert severity="error">{t('Error finding subtasks.')}</Alert>
      </>
    );

  return (
    <>
      <Helmet>
        <title>
          {t('Subtasks for chore')}#{choreId}
        </title>
        <link type="image/png" rel="icon" href="/icons/view_chore.png" />
      </Helmet>
      <Button component={Link} to={document.URL.substring(0, document.URL.lastIndexOf('/'))}>
        {t('Back')}
      </Button>
      {keycloak.authenticated && (
        <Button component={Link} to={`${document.URL}/new`}>
          {t('Add subtask')}
        </Button>
      )}
      <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
        {subtasks && subtasks.length > 0 ? (
          <Box width="75vw" display="flex" justifyContent="center" alignItems="center">
            <Grid2 container spacing={2} justifyContent="center">
              {subtasks.map((subtask) => (
                <Grid2 key={subtask.id} size={{ xs: 12, sm: 12, md: 12 }} display="flex" justifyContent="center">
                  <SubtaskCard subtask={subtask} />
                </Grid2>
              ))}
            </Grid2>
          </Box>
        ) : (
          <Typography>{t('There are no subtasks assigned to this chore')}</Typography>
        )}
      </Box>
    </>
  );
}
