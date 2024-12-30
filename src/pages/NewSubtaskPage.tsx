import { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Alert, Box, Button, CircularProgress } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { NewSubtask } from '../types/subtaskTypes';
import { useCreateSubtask } from '../hooks/useSubtasks';
import { StyledTextField } from '../styled_components/StyledTextField';
import { useChore } from '../hooks/useChores';

export function NewSubtaskPage() {
  const { t } = useTranslation();
  const { choreId } = useParams();
  const navigate = useNavigate();
  const [newSubtask, setNewSubtask] = useState<NewSubtask>({
    name: '',
  });
  const { mutate, isPending, isError, error, isSuccess } = useCreateSubtask(Number(choreId), newSubtask);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setNewSubtask((oldValue) => {
      return { ...oldValue, [e.target.name]: e.target.value };
    });
  }, []);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      mutate({ choreId: Number(choreId), subtask: newSubtask });
    },
    [mutate],
  );

  useEffect(() => {
    if (isSuccess) {
      navigate(`/chores/${choreId}/subtasks`);
    }
  }, [isSuccess, navigate]);

  const { isLoading, isError: choreError } = useChore(Number(choreId));

  if (isLoading)
    return (
      <>
        <Helmet>
          <title>
            {t('Add a new subtask to chore')}#{choreId}
          </title>
          <link type="image/png" rel="icon" href="/icons/add_new_chore.png" />
        </Helmet>
        <CircularProgress />
      </>
    );

  if (choreError)
    return (
      <>
        <Helmet>
          <title>{t('Error')}</title>
          <link type="image/png" rel="icon" href="/icons/add_new_chore.png" />
        </Helmet>
        <Alert severity="error">{t('Error finding chore.')}</Alert>
      </>
    );

  return (
    <>
      <Helmet>
        <title>
          {t('Add a new subtask to chore')}#{choreId}
        </title>
        <link type="image/png" rel="icon" href="/icons/add_new_chore.png" />
      </Helmet>

      <Box component="form" onSubmit={handleSubmit} sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}>
        <StyledTextField label={t('Name')} name="name" value={newSubtask.name} onChange={handleChange} required />
        <Box sx={{ mt: 2 }}>
          <Button type="submit" variant="contained" color="primary">
            {t('Add subtask')}
          </Button>
          <Button component={Link} to={document.URL.substring(0, document.URL.lastIndexOf('/'))}>
            {t('Cancel')}
          </Button>
        </Box>
      </Box>

      {isPending && <CircularProgress />}
      {isError && (
        <Alert severity="error" sx={{ marginTop: '15px' }}>
          {error.response.data}
        </Alert>
      )}
    </>
  );
}
