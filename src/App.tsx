import { useState } from 'react'
import './styles/App.css'
import { AdviceCard } from './components/AdviceCard';
import { Header } from './components/Header';
import { Button, Typography } from '@mui/material';
import { Form } from './components/SearchForm';

type Advice = {
  id: number,
  advice: string,
  favorite: boolean
}

type AdviceFromKeyword = {
  id: number,
  advice: string,
  date: string
}

function App() {
  const [searchingForAdvice, setSearchingForAdvice] = useState(false);
  const [advices, setAdvices] = useState<Advice[]>([])
  const [showFavorites, setShowFavorites] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [noResults, setNoResults] = useState(false);

  const addAdvice = async () => {
    if (!searchingForAdvice) {
      setNoResults(false);
      setSearchingForAdvice(true);
      const resp = await fetch('https://api.adviceslip.com/advice');
      const json = await resp.json();
      const advice = json.slip;
      advice.favorite = false;
      for (let i = 0; i < advices.length; i++) {
        if (advices[i].id === advice.id) {
          setSearchingForAdvice(false);
          addAdvice();
          return;
        }
      }
      setAdvices((advices) => [...advices, advice]);
      setSearchingForAdvice(false);
    }
  };

  const toggleFavorite = (id: number) => {
    setAdvices((advices) =>
      advices.map((advice) =>
        advice.id === id ? { id: advice.id, advice: advice.advice, favorite: !advice.favorite } : advice
      )
    );
  };

  const displayedAdvices = showFavorites
    ? advices.filter(advice => advice.favorite)
    : advices;

  const searchAdvice = async () => {
    if (keyword === "") {
      setNoResults(true);
      setAdvices([]);
      return;
    }

    const resp = await fetch(`https://api.adviceslip.com/advice/search/${keyword}`);
    const json = await resp.json();

    if (json.slips) {
      const adviceList = json.slips.map((advice: AdviceFromKeyword) => ({
        id: advice.id,
        advice: advice.advice,
        favorite: false,
      }));
      setNoResults(false);
      setAdvices(adviceList);
    } else {
      setNoResults(true);
      setAdvices([]);
    }
  };

  return (
    <>
      <Header showFavorites={showFavorites} toggleFavorites={() => setShowFavorites(!showFavorites)} />
      <Form keyword={keyword} onKeywordChange={(event) => setKeyword(event.target.value)} onSearch={searchAdvice}></Form>
      <Button
        variant="contained"
        onClick={addAdvice}
        style={{ position: 'fixed', top: '6%', left: '80%' }}
      >
        Get random advice
      </Button>
      {noResults ? (
        <Typography color="error">
          No advice found containing the keyword: "{keyword}"
        </Typography>
      ) : (
        <>
          {displayedAdvices.map((advice) => (
            <AdviceCard
              key={advice.id}
              advice={advice.advice}
              isFavorite={advice.favorite}
              toggleFavorite={() => toggleFavorite(advice.id)} />
          ))}
        </>
      )}
    </>
  )
}

export default App
