import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ChoreFormFields from '../components/ChoreFormFields';
import { useChore, useUpdateChore } from '../hooks/useChores';
import { Alert, CircularProgress } from '@mui/material';
import { UpdateChore } from '../types/choreTypes';

export function UpdateChorePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const result = useChore(Number(id));
  const chore = result.data;
  const isLoading = result.isLoading;
  const fetchError = result.isError;

  const [updatedChore, setUpdatedChore] = useState<UpdateChore>({
    title: '',
    description: '',
    deadline: new Date(),
    priorityLevel: 1,
    done: false,
  });
  useEffect(() => {
    if (chore) setUpdatedChore(chore);
  }, [chore]);

  const { mutate, isPending, isError, error } = useUpdateChore(Number(id), updatedChore);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUpdatedChore((updatedChore) => {
      if (e.target.name === 'done') {
        return { ...updatedChore, [e.target.name]: e.target.checked };
      } else {
        return { ...updatedChore, [e.target.name]: e.target.value };
      }
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate({ id: Number(id), chore: updatedChore }, { onSuccess: () => navigate(`/chores/${id}`) });
  };

  if (isLoading) return <CircularProgress />;

  if (fetchError || !chore) return <Alert severity="error">Error fetching chore.</Alert>;

  return (
    <>
      <ChoreFormFields
        choreInfo={updatedChore}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        submitLabel="Update"
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
