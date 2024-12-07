import { getChore, getChores } from '../requests/choreRequests';
import { Chore } from '../types/choreTypes';
import { useQuery } from '@tanstack/react-query';

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

// export function useCreateChore() {
//   const queryClient = useQueryClient();
//   return useMutation<Chore, unknown, NewChore>((newChore) => choreApi.post('/', newChore).then((res) => res.data), {
//     onSuccess: () => {
//       queryClient.invalidateQueries('chores');
//     },
//   });
// }

// export function useUpdateChore() {
//   const queryClient = useQueryClient();
//   return useMutation<Chore, unknown, { id: number; chore: UpdateChore }>(
//     ({ id, chore }) => choreApi.patch(`/${id}`, chore).then((res) => res.data),
//     {
//       onSuccess: (_, { id }) => {
//         queryClient.invalidateQueries(['chore', id]);
//         queryClient.invalidateQueries('chores');
//       },
//     },
//   );
// }

// export function useDeleteChore() {
//   const queryClient = useQueryClient();
//   return useMutation<void, unknown, string>((id) => choreApi.delete(`/${id}`).then(() => {}), {
//     onSuccess: () => {
//       queryClient.invalidateQueries('chores');
//     },
//   });
// }
