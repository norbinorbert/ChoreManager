import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Alert, CircularProgress } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { Chore, NewChore } from '../types/choreTypes';
import ChoreFormFields from '../components/ChoreFormFields';
import { useCreateChore } from '../hooks/useChores';

export function NewChorePage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [newChore, setNewChore] = useState<NewChore>({
    title: '',
    description: '',
    deadline: new Date().toISOString().slice(0, 10),
    priorityLevel: 1,
  });
  const { mutate, isPending, isError, error, isSuccess } = useCreateChore(newChore);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setNewChore((oldValue) => {
      return { ...oldValue, [e.target.name]: e.target.value };
    });
  }, []);

  const [newId, setNewId] = useState(0);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      mutate(newChore, {
        onSuccess: (createdChore: Chore) => {
          setNewId(createdChore.id);
        },
      });
    },
    [mutate, newChore],
  );

  useEffect(() => {
    if (isSuccess) {
      navigate(`/chores/${newId}`);
    }
  }, [isSuccess, newId, navigate]);

  return (
    <>
      <Helmet>
        <title>{t('Add a new chore')}</title>
        <link type="image/png" rel="icon" href="/icons/add_new_chore.png" />
      </Helmet>
      <ChoreFormFields
        choreInfo={newChore}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        submitLabel={t('Create')}
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
