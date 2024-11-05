import { Card, CardContent, IconButton, Typography } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

export function AdviceCard(props: { advice: string, isFavorite: boolean, toggleFavorite: () => void }) {
    return (
        <Card>
            <CardContent>
                <Typography>{props.advice}</Typography>
                <IconButton onClick={props.toggleFavorite} color={props.isFavorite ? "secondary" : "default"}>
                    {props.isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                </IconButton>
            </CardContent>
        </Card>
    )
}