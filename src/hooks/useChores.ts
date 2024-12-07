import { createChore, deleteChore, getChore, getChores, updateChore } from '../requests/choreRequests';
import { Chore, NewChore, UpdateChore } from '../types/choreTypes';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export function useChores() {
  return useQuery<Chore[]>({
    queryKey: ['chores'],
    queryFn: getChores,
  });
}

export function useChore(id: number) {
  return useQuery<Chore>({
    queryKey: ['chore', id],
    queryFn: () => getChore(id),
  });
}

export function useCreateChore(chore: NewChore) {
  const queryClient = useQueryClient();
  return useMutation<Chore, unknown, NewChore>({
    mutationFn: () => createChore(chore),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['chores'] });
    },
  });
}

export function useUpdateChore(id: number, chore: UpdateChore) {
  const queryClient = useQueryClient();
  return useMutation<unknown, unknown, { id: number; chore: UpdateChore }>({
    mutationFn: () => updateChore(id, chore),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['chore', id] });
      queryClient.invalidateQueries({ queryKey: ['chores'] });
    },
  });
}

export function useDeleteChore(id: number) {
  const queryClient = useQueryClient();
  return useMutation<unknown, unknown, number>({
    mutationFn: () => deleteChore(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['chores'] });
    },
  });
}
