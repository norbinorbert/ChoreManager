import { Helmet } from 'react-helmet-async';
import { Link, useParams } from 'react-router-dom';
import { Alert, Box, Button, CircularProgress, Grid2, Typography } from '@mui/material';
import { useSubtasks } from '../hooks/useSubtasks';
import { SubtaskCard } from '../components/SubtaskCard';

export function SubtasksPage() {
  const { choreId } = useParams();
  const { data, isLoading, isError } = useSubtasks(Number(choreId));
  const subtasks = data;

  if (isLoading)
    return (
      <>
        <Helmet>
          <title>Subtasks for chore #{choreId}</title>
          <link type="image/png" rel="icon" href="/icons/view_chore.png" />
        </Helmet>
        <CircularProgress />
      </>
    );

  if (isError)
    return (
      <>
        <Helmet>
          <title>Error</title>
          <link type="image/png" rel="icon" href="/icons/view_chore.png" />
        </Helmet>
        <Alert severity="error">Error finding chore.</Alert>
      </>
    );

  return (
    <>
      <Helmet>
        <title>Subtasks for chore #{choreId}</title>
        <link type="image/png" rel="icon" href="/icons/view_chore.png" />
      </Helmet>
      <Button component={Link} to={document.URL.substring(0, document.URL.lastIndexOf('/'))}>
        Back
      </Button>
      <Button component={Link} to={`${document.URL}/new`}>
        Add subtask
      </Button>
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
          <Typography>There are no subtasks assigned to this chore</Typography>
        )}
      </Box>
    </>
  );
}
