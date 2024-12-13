import axios from 'axios';
import { Chore, NewChore, UpdateChore } from '../types/choreTypes';

const choreApi = axios.create({
  baseURL: 'http://localhost:8080/',
  headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
});

export async function getChores() {
  const chores: Chore[] = (await choreApi.get('/chores')).data;
  return chores;
}

export async function getChore(id: number) {
  const chore: Chore = (await choreApi.get(`/chores/${id}`)).data;
  return chore;
}

export async function createChore(chore: NewChore) {
  const responseChore: Chore = (await choreApi.post('/chores', chore)).data;
  return responseChore;
}

export function updateChore(id: number, chore: UpdateChore) {
  return choreApi.patch(`/chores/${id}`, chore);
}

export function deleteChore(id: number) {
  return choreApi.delete(`/chores/${id}`);
}
