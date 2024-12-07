import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Chore, NewChore } from '../types/choreTypes';
import ChoreFormFields from '../components/ChoreForm';
// import { useCreateChore } from '../hooks/useChores';

export function NewChorePage() {
  const navigate = useNavigate();
  const createChore = useCreateChore();
  const [formState, setFormState] = useState<NewChore>({
    title: '',
    description: '',
    deadline: new Date(),
    priorityLevel: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createChore.mutate(formState, {
      onSuccess: (createdChore: Chore) => navigate(`/chores/${createdChore.id}`),
    });
  };

  return (
    <ChoreFormFields
      formState={formState}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      submitLabel="Create"
    />
  );
}
