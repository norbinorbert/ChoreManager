import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ChoreFormFields from '../components/ChoreForm';
import { useChore, useUpdateChore } from '../hooks/useChores';
import { CircularProgress } from '@mui/material';
import { UpdateChore } from '../types/choreTypes';

export function UpdateChorePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const updateChore = useUpdateChore();
  const chore = useChore(Number(id)).data;

  const [formState, setFormState] = useState<UpdateChore>({
    title: '',
    description: '',
    deadline: new Date(),
    priorityLevel: 0,
    done: false,
  });

  useEffect(() => {
    if (chore) setFormState(chore);
  }, [chore]);

  if (!chore) return <CircularProgress />;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateChore.mutate(
      { id: Number(id), chore: formState },
      {
        onSuccess: () => navigate(`/chores/${id}`),
      },
    );
  };

  return (
    <ChoreFormFields
      formState={formState}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      submitLabel="Update"
    />
  );
}
