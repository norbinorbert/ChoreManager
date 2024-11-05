import { useState } from 'react'
import './styles/App.css'
import { AdviceCard } from './components/AdviceCard';
import { Header } from './components/Header';
import { Button } from '@mui/material';

type Advice = {
  slip: {
    id: number,
    advice: string
  }
  favorite: boolean
}

function App() {
  const [advices, setAdvices] = useState<Advice[]>([])
  const [showFavorites, setShowFavorites] = useState(false);

  const addAdvice = async () => {
    const resp = await fetch('https://api.adviceslip.com/advice');
    const advice = await resp.json();
    advice.favorite = false;
    for (let i = 0; i < advices.length; i++) {
      if (advices[i].slip.id === advice.slip.id) {
        addAdvice();
        return;
      }
    }
    setAdvices((advices) => [...advices, advice]);
  };

  const toggleFavorite = (id: number) => {
    setAdvices((advices) =>
      advices.map((advice) =>
        advice.slip.id === id ? { slip: advice.slip, favorite: !advice.favorite } : advice
      )
    );
  };

  const displayedAdvices = showFavorites
    ? advices.filter(advice => advice.favorite)
    : advices;

  return (
    <>
      <Header showFavorites={showFavorites} toggleFavorites={() => setShowFavorites(!showFavorites)} />
      <Button onClick={addAdvice}>Get random advice</Button>
      {displayedAdvices.map((advice) => (
        <AdviceCard
          key={advice.slip.id}
          advice={advice.slip.advice}
          isFavorite={advice.favorite}
          toggleFavorite={() => toggleFavorite(advice.slip.id)} />
      ))}
    </>
  )
}

export default App
