import { Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import { Chore } from '../types/choreTypes';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Cancel, CheckCircle } from '@mui/icons-material';
import { useDeleteChore } from '../hooks/useChores';

export function ChoreCard(props: { chore: Chore; showDescription: boolean }) {
  const { id } = useParams();
  const { chore } = props;
  const { showDescription } = props;
  const navigate = useNavigate();
  const deleteChore = useDeleteChore(Number(id));

  const handleDelete = () => {
    deleteChore.mutate(Number(id), {
      onSuccess: () => navigate(`/chores`),
    });
  };

  return (
    <Card>
      <CardContent>
        <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
          {chore.priorityLevel}
        </Typography>
        <Typography variant="h5" component="div">
          {chore.title}
        </Typography>
        <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>Deadline: {chore.deadline.toString()}</Typography>
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
          </>
        ) : (
          <Button component={Link} to={`/chores/${chore.id}`}>
            Details
          </Button>
        )}
      </CardActions>
    </Card>
  );
}
