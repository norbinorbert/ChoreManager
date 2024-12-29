import { Chore } from '../types/choreTypes';
import { NewSubtask, Subtask } from '../types/subtaskTypes';
import { choreApi } from './choreRequests';

export async function getSubtasks(choreId: number) {
  const subtasks: Subtask[] = (await choreApi.get(`/chores/${choreId}/subtasks`)).data;
  return subtasks;
}

export async function createSubtask(choreId: number, subtask: NewSubtask) {
  const responseChore: Chore = (await choreApi.post(`/chores/${choreId}/subtasks`, subtask)).data;
  return responseChore;
}

export function deleteSubtask(choreId: number, subtaskId: number) {
  return choreApi.delete(`/chores/${choreId}/subtasks/${subtaskId}`);
}
