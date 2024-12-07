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

export async function updateChore(id: number, chore: UpdateChore) {
  return await choreApi.patch(`/chores/${id}`, chore);
}

export async function deleteChore(id: number) {
  return await choreApi.delete(`/chores/${id}`);
}
