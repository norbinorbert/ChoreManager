import { Card, CardContent, Typography } from '@mui/material';

type Advice = {
    slip: {
      id: number,
      advice: string
    }
  }
  
export function AdviceCard(props: {advice: Advice}) {
    return (
    <Card>
        <CardContent>
        <Typography>{props.advice.slip.advice}</Typography>
        </CardContent>
    </Card>
    )
}