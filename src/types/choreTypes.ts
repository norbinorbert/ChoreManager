export type Chore = {
  id: number;
  title: string;
  description: string | null;
  deadline: Date;
  priorityLevel: number;
  done: boolean;
};

export type NewChore = {
  title: string;
  description: string | null;
  deadline: Date;
  priorityLevel: number;
};

export type UpdateChore = {
  title: string;
  description: string | null;
  deadline: Date;
  priorityLevel: number;
  done: boolean;
};
