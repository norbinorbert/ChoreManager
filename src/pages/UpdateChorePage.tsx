import { useNavigate, useParams } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import { Alert, CircularProgress } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import ChoreFormFields from '../components/ChoreFormFields';
import { useChore, useUpdateChore } from '../hooks/useChores';
import { UpdateChore } from '../types/choreTypes';

export function UpdateChorePage() {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  const result = useChore(Number(id));
  const chore = result.data;
  const { isLoading } = result;
  const fetchError = result.isError;

  const [updatedChore, setUpdatedChore] = useState<UpdateChore>({
    title: '',
    description: '',
    deadline: new Date().toString(),
    priorityLevel: 1,
    done: false,
  });
  useEffect(() => {
    if (chore) setUpdatedChore(chore);
  }, [chore]);

  const { mutate, isPending, isError, error } = useUpdateChore(Number(id), updatedChore);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setUpdatedChore((oldValue) => {
      if (e.target.name === 'done') {
        return { ...oldValue, [e.target.name]: e.target.checked };
      }
      return { ...oldValue, [e.target.name]: e.target.value };
    });
  }, []);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      mutate({ id: Number(id), chore: updatedChore }, { onSuccess: () => navigate(`/chores/${id}`) });
    },
    [mutate, id, updatedChore, navigate],
  );

  if (isLoading)
    return (
      <>
        <Helmet>
          <title>
            {t('Update chore')}#{id}
          </title>
          <link type="image/png" rel="icon" href="/icons/update_chore.png" />
        </Helmet>
        <CircularProgress />
      </>
    );

  if (fetchError || !chore)
    return (
      <>
        <Helmet>
          <title>{t('Error')}</title>
          <link type="image/png" rel="icon" href="/icons/update_chore.png" />
        </Helmet>
        <Alert severity="error">{t('Error fetching chore.')}</Alert>
      </>
    );

  return (
    <>
      <Helmet>
        <title>
          {t('Update chore')}#{id}
        </title>
        <link type="image/png" rel="icon" href="/icons/update_chore.png" />
      </Helmet>
      <ChoreFormFields
        choreInfo={updatedChore}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        submitLabel={t('Update')}
      />
      {isPending && <CircularProgress />}
      {isError && (
        <Alert severity="error" sx={{ marginTop: '15px' }}>
          {error.response.data}
        </Alert>
      )}
    </>
  );
}
