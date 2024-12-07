import { Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import { Chore } from '../types/choreTypes';
import { Link } from 'react-router-dom';

export function ChoreCard(props: { chore: Chore; showDescription: boolean }) {
  const { chore } = props;
  const { showDescription } = props;
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
          {chore.priorityLevel}
        </Typography>
        <Typography variant="h5" component="div">
          {chore.title}
        </Typography>
        <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>{chore.deadline.toString()}</Typography>
        {showDescription && <Typography variant="body2">{chore.description}</Typography>}
        <Typography variant="body2">{chore.done ? 'done' : 'not done'}</Typography>
      </CardContent>
      <CardActions>
        {showDescription ? (
          <Button component={Link} to={`${document.URL}/edit`}>
            Edit
          </Button>
        ) : (
          <Button component={Link} to={`/chores/${chore.id}`}>
            Details
          </Button>
        )}
      </CardActions>
    </Card>
  );
}
