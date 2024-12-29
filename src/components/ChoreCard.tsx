import { Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Cancel, CheckCircle } from '@mui/icons-material';
import { useCallback, useState } from 'react';
import { useDeleteChore } from '../hooks/useChores';
import { Chore } from '../types/choreTypes';
import { ConfirmDialog } from './ConfirmDialog';

type ChoreCardProps = {
  chore: Chore;
  showDescription: boolean;
};

export function ChoreCard(props: ChoreCardProps) {
  const { id } = useParams();
  const { chore, showDescription } = props;
  const navigate = useNavigate();
  const deleteChore = useDeleteChore(Number(id));
  const [open, setOpen] = useState(false);

  const handleDelete = useCallback(() => {
    setOpen(true);
  }, []);

  const handleNo = useCallback(() => {
    setOpen(false);
  }, []);

  const handleYes = useCallback(() => {
    setOpen(false);
    deleteChore.mutate(Number(id), {
      onSuccess: () => navigate('/chores'),
    });
  }, [deleteChore, id, navigate]);

  return (
    <Card>
      <CardContent>
        <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
          {chore.priorityLevel}
        </Typography>
        <Typography variant="h5" component="div">
          {chore.title}
        </Typography>
        <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>Deadline: {chore.deadline}</Typography>
        {showDescription && <Typography variant="body2">{chore.description}</Typography>}
        <Typography variant="body2">
          {chore.done ? <CheckCircle style={{ color: 'green' }} /> : <Cancel style={{ color: 'red' }} />}
        </Typography>
      </CardContent>
      <CardActions>
        {showDescription ? (
          <>
            <Button component={Link} to={`${document.URL}/edit`}>
              Edit
            </Button>
            <Button onClick={handleDelete}>Delete</Button>
            <Button component={Link} to={`${document.URL}/subtasks`}>
              Subtasks
            </Button>
          </>
        ) : (
          <Button component={Link} to={`/chores/${chore.id}`}>
            Details
          </Button>
        )}
        <ConfirmDialog
          open={open}
          title="Are you sure you want to delete the chore?"
          handleNo={handleNo}
          handleYes={handleYes}
        />
      </CardActions>
    </Card>
  );
}
