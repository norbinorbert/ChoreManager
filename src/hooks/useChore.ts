import { Chore } from '../types/choreType';

export const useChore = (id) => {
  const chore: Chore = {
    id: 1,
    title: 'a',
    description: 'b',
    deadline: new Date(),
    priorityLevel: 1,
    done: true,
  };
  const isLoading: boolean = false;
  return { chore, isLoading };
};
