import axios from 'axios';
import { Chore } from '../types/choreTypes';

const choreApi = axios.create({
  baseURL: 'http://localhost:8080/',
});

export async function getChores() {
  const chores: Chore[] = (await choreApi.get('/chores')).data;
  return chores;
}

export async function getChore(id: number) {
  const chore: Chore = (await choreApi.get(`/chores/${id}`)).data;
  return chore;
}
