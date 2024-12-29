import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createChore, deleteChore, getChore, getChores, updateChore } from '../requests/choreRequests';
import { Chore, NewChore, UpdateChore } from '../types/choreTypes';

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
  return useMutation<Chore, { response: { data: string } }, NewChore>({
    mutationFn: () => createChore(chore),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['chores'] });
    },
  });
}

export function useUpdateChore(id: number, chore: UpdateChore) {
  const queryClient = useQueryClient();
  return useMutation<unknown, { response: { data: string } }, { id: number; chore: UpdateChore }>({
    mutationFn: () => updateChore(id, chore),
    onSuccess: () => {
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
      queryClient.invalidateQueries({ queryKey: ['subtasks', id] });
    },
  });
}
