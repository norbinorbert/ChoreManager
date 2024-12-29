import { Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useCallback, useState } from 'react';
import { ConfirmDialog } from './ConfirmDialog';
import { Subtask } from '../types/subtaskTypes';
import { useDeleteSubtask } from '../hooks/useSubtasks';

type SubtaskCardProps = {
  subtask: Subtask;
};

export function SubtaskCard(props: SubtaskCardProps) {
  const { choreId } = useParams();
  const { subtask } = props;
  const navigate = useNavigate();
  const deleteSubtask = useDeleteSubtask(Number(choreId), subtask.id);
  const [open, setOpen] = useState(false);

  const handleDelete = useCallback(() => {
    setOpen(true);
  }, []);

  const handleNo = useCallback(() => {
    setOpen(false);
  }, []);

  const handleYes = useCallback(() => {
    setOpen(false);
    deleteSubtask.mutate(
      { choreId: Number(choreId), subtaskId: subtask.id },
      {
        onSuccess: () => navigate(`/chores/${choreId}/subtasks`),
      },
    );
  }, []);

  return (
    <Card style={{ width: '100%', maxWidth: 500 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {subtask.name}
        </Typography>
      </CardContent>
      <CardActions>
        <Button onClick={handleDelete}>Delete</Button>
        <ConfirmDialog
          open={open}
          title="Are you sure you want to delete the subtask?"
          handleNo={handleNo}
          handleYes={handleYes}
        />
      </CardActions>
    </Card>
  );
}
