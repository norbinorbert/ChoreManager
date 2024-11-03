import { useState } from 'react'
import './styles/App.css'
import { AdviceCard } from './components/AdviceCard';
import { Header } from './components/Header';

type Advice = {
  slip: {
    id: number,
    advice: string
  }
}

function App() {
  const [advices, setAdvices] = useState<Advice[]>([])

  const addAdvice = async () => {
    const resp = await fetch('https://api.adviceslip.com/advice');
    const advice = await resp.json();
    for(let i=0; i<advices.length; i++){  
      if(advices[i].slip.id === advice.slip.id){
        addAdvice();
        return;
      }
    }
    setAdvices(advices.concat(advice));
  };

  return (
    <>
      <Header></Header>
      <button onClick={addAdvice}>Get random advice</button>
        {advices.map((advice) => (
          <AdviceCard key={advice.slip.id} advice={advice.slip.advice} />
        ))}
      
    </>
  )
}

export default App
