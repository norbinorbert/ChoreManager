import { Card, CardContent, Typography } from '@mui/material';
import { useState } from 'react';
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
  
export function AdviceCard(props: {key: number, advice: string}) {
    const changeHeart = () => {
        setFilledHeart(!filledHeart);
    }
    const emptyHeart = <CiHeart size={42} color='pink' onClick={changeHeart}></CiHeart>;
    const fullHeart = <FaHeart size={42} color='pink' onClick={changeHeart}></FaHeart>;
    const [filledHeart, setFilledHeart] = useState(false);
    
    return (
    <Card>
        <CardContent>
            <Typography>{props.advice}</Typography>
            {filledHeart ? fullHeart : emptyHeart}
        </CardContent>
    </Card>
    )
}