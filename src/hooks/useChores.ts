import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createChore, deleteChore, getChore, getChores, updateChore } from '../requests/choreRequests';
import { Chore, NewChore, UpdateChore } from '../types/choreTypes';
import { deleteFromCache, getFromCache, saveToCache } from '../db';

export function useChores() {
  return useQuery<Chore[]>({
    queryKey: ['chores'],
    queryFn: async () => {
      const cachedData = await getFromCache('chores');
      if (cachedData) {
        return cachedData;
      }

      const choresData = await getChores();
      await saveToCache('chores', choresData);
      return choresData;
    },
  });
}

export function useChore(id: number) {
  return useQuery<Chore>({
    queryKey: ['chore', id],
    queryFn: async () => {
      const cachedData = await getFromCache(`chore#${id}`);
      if (cachedData) {
        return cachedData;
      }
      const choreData = await getChore(id);
      await saveToCache(`chore#${id}`, choreData);
      return choreData;
    },
  });
}

export function useCreateChore(chore: NewChore) {
  const queryClient = useQueryClient();
  return useMutation<Chore, { response: { data: string } }, NewChore>({
    mutationFn: () => createChore(chore),
    onSuccess: async () => {
      await deleteFromCache('chores');
      queryClient.invalidateQueries({ queryKey: ['chores'] });
    },
  });
}

export function useUpdateChore(id: number, chore: UpdateChore) {
  const queryClient = useQueryClient();
  return useMutation<unknown, { response: { data: string } }, { id: number; chore: UpdateChore }>({
    mutationFn: () => updateChore(id, chore),
    onSuccess: async () => {
      await deleteFromCache(`chore#${id}`);
      await deleteFromCache('chores');
      queryClient.invalidateQueries({ queryKey: ['chore', id] });
      queryClient.invalidateQueries({ queryKey: ['chores'] });
    },
  });
}

export function useDeleteChore(id: number) {
  const queryClient = useQueryClient();
  return useMutation<unknown, unknown, number>({
    mutationFn: () => deleteChore(id),
    onSuccess: async () => {
      await deleteFromCache(`chore#${id}-subtasks`);
      await deleteFromCache('chores');
      queryClient.invalidateQueries({ queryKey: ['chores'] });
      queryClient.invalidateQueries({ queryKey: ['subtasks', id] });
    },
  });
}
