import { Chore } from '../types/choreType';

export const useChores = () => {
  const chores: Chore[] = [
    {
      id: 1,
      title: 'a',
      description: 'b',
      deadline: new Date(),
      priorityLevel: 1,
      done: true,
    },
    {
      id: 2,
      title: 'a',
      description: 'b',
      deadline: new Date(),
      priorityLevel: 3,
      done: true,
    },
    {
      id: 2,
      title: 'a',
      description: 'b',
      deadline: new Date(),
      priorityLevel: 3,
      done: true,
    },
    {
      id: 2,
      title: 'a',
      description: 'b',
      deadline: new Date(),
      priorityLevel: 3,
      done: true,
    },
  ];
  const isLoading: boolean = false;
  return { chores, isLoading };
};
