export type updateChore = {
  title: string;
  description: string | undefined;
  deadline: Date;
  priorityLevel: number;
  done: boolean;
};
