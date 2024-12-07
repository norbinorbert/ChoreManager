import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ChoreFormFields from '../components/ChoreForm';
import { useChore, useUpdateChore } from '../hooks/useChores';
import { Alert, CircularProgress } from '@mui/material';
import { UpdateChore } from '../types/choreTypes';

export function UpdateChorePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, isError } = useChore(Number(id));
  const chore = data;

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

  const updateChore = useUpdateChore(Number(id), updatedChore);

  if (isLoading) return <CircularProgress />;

  if (isError || !chore) return <Alert severity="error">Error fetching chore.</Alert>;

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
    updateChore.mutate(
      { id: Number(id), chore: updatedChore },
      {
        onSuccess: () => navigate(`/chores/${id}`),
      },
    );
  };

  return (
    <ChoreFormFields
      choreInfo={updatedChore}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      submitLabel="Update"
    />
  );
}
