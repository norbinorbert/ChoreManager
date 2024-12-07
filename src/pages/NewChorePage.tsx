import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Chore, NewChore } from '../types/choreTypes';
import ChoreFormFields from '../components/ChoreForm';
import { useCreateChore } from '../hooks/useChores';

export function NewChorePage() {
  const navigate = useNavigate();
  const [newChore, setNewChore] = useState<NewChore>({
    title: '',
    description: '',
    deadline: new Date(),
    priorityLevel: 1,
  });
  const createChore = useCreateChore(newChore);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewChore((newChore) => {
      return { ...newChore, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createChore.mutate(newChore, {
      onSuccess: (createdChore: Chore) => navigate(`/chores/${createdChore.id}`),
    });
  };

  return (
    <ChoreFormFields
      choreInfo={newChore}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      submitLabel="Create"
    />
  );
}
