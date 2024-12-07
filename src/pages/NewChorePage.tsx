import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Chore, NewChore } from '../types/choreTypes';
import ChoreFormFields from '../components/ChoreForm';
import { useCreateChore } from '../hooks/useChores';
import { Alert, CircularProgress } from '@mui/material';

export function NewChorePage() {
  const navigate = useNavigate();
  const [newChore, setNewChore] = useState<NewChore>({
    title: '',
    description: '',
    deadline: new Date(),
    priorityLevel: 1,
  });
  const { mutate, isPending, isError, error, isSuccess } = useCreateChore(newChore);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewChore((newChore) => {
      return { ...newChore, [e.target.name]: e.target.value };
    });
  };

  const [newId, setNewId] = useState(0);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate(newChore, {
      onSuccess: (createdChore: Chore) => {
        setNewId(createdChore.id);
      },
    });
  };

  useEffect(() => {
    if (isSuccess) {
      navigate(`/chores/${newId}`);
    }
  }, [isSuccess, newId, navigate]);

  return (
    <>
      <ChoreFormFields
        choreInfo={newChore}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        submitLabel="Create"
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
