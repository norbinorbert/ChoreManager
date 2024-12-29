import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { NewSubtask, Subtask } from '../types/subtaskTypes';
import { createSubtask, deleteSubtask, getSubtasks } from '../requests/subtaskRequests';
import { Chore } from '../types/choreTypes';
import { deleteFromCache, getFromCache, saveToCache } from '../db';

export function useSubtasks(choreId: number) {
  return useQuery<Subtask[]>({
    queryKey: ['subtasks', choreId],
    queryFn: async () => {
      const cachedData = await getFromCache(`chore#${choreId}-subtasks`);
      if (cachedData) {
        return cachedData;
      }

      const subtasks = await getSubtasks(choreId);
      await saveToCache(`chore#${choreId}-subtasks`, subtasks);
      return subtasks;
    },
  });
}

export function useCreateSubtask(choreId: number, subtask: NewSubtask) {
  const queryClient = useQueryClient();
  return useMutation<Chore, { response: { data: string } }, { choreId: number; subtask: NewSubtask }>({
    mutationFn: () => createSubtask(choreId, subtask),
    onSuccess: async () => {
      await deleteFromCache(`chore#${choreId}-subtasks`);
      queryClient.invalidateQueries({ queryKey: ['subtasks', choreId] });
    },
  });
}

export function useDeleteSubtask(choreId: number, subtaskId: number) {
  const queryClient = useQueryClient();
  return useMutation<unknown, unknown, { choreId: number; subtaskId: number }>({
    mutationFn: () => deleteSubtask(choreId, subtaskId),
    onSuccess: async () => {
      await deleteFromCache(`chore#${choreId}-subtasks`);
      queryClient.invalidateQueries({ queryKey: ['subtasks', choreId] });
    },
  });
}
