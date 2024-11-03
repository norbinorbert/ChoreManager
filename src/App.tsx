import { Dispatch, ReactElement, SetStateAction, useState } from 'react'
import './App.css'
import { AdviceCard } from './components/AdviceCard';

function App() {
  const [cards, setCards] : [ReactElement[], Dispatch<SetStateAction<ReactElement[]>>] = useState([<></>])

  const addAdvice = async () => {
    const resp = await fetch('https://api.adviceslip.com/advice');
    const advice = await resp.json();
    setCards(cards.concat(<AdviceCard advice={advice}></AdviceCard>));
  };

  return (
    <>
      <div className="card">
        <button onClick={addAdvice}>Get random advice</button>
        {cards}
      </div>
    </>
  )
}

export default App
