import { Subtask } from './subtaskTypes';

export type Chore = {
  id: number;
  title: string;
  description: string | null;
  deadline: string;
  priorityLevel: number;
  done: boolean;
  subtasks: Subtask[] | null;
};

export type NewChore = {
  title: string;
  description: string | null;
  deadline: string;
  priorityLevel: number;
};

export type UpdateChore = {
  title: string;
  description: string | null;
  deadline: string;
  priorityLevel: number;
  done: boolean;
};
