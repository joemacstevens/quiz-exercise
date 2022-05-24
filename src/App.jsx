/** @jsxImportSource @emotion/react */
import { useEffect, useState, Fragment} from 'react';
import { Routes, Route } from 'react-router-dom';
import { Quiz } from './components/Quiz';
import { Results } from './components/Results';
import { Start } from './components/Start';
import { Global, css} from '@emotion/react'


const GlobalStyles = css`
  body {
    font-family: 'Poppins', sans-serif;
    width: 100vw;
    height: 100vh;
    margin: 0;
    padding: 0;
    background: #fafafa;
  }`

export default function App() {


  const [results, setResults] = useState({ correct: 0, incorrect: 0, score: 0 });
  const [topscore,setTopScore] = useState(0);

  const updateResults = (choice) => {
    const score = Math.round(results.correct / (results.correct + results.incorrect) * 100);
      if (choice) {
        setResults({ ...results, correct: results.correct + 1, score: score });
      } else {
        setResults({ ...results, incorrect: results.incorrect + 1, score: score });
      }
  }

  const storeResults = (time) => {
    const score = Math.round(results.correct / (results.correct + results.incorrect) * 100);
    const data = {
      correct: results.correct,
      incorrect: results.incorrect,
      score: results.score,
      time: time
    };
    localStorage.setItem(time, JSON.stringify(data));
  }

  const resetResults = (results) => {
    setResults({ ...results, correct: 0, incorrect: 0, score: 0 });
  }


const topScores = () => {
  let values = [],
      keys = Object.keys(localStorage),
      i = keys.length;

  while (i--) {
      values.push(localStorage.getItem(keys[i]));
  }

  values.sort((a,b) => {
      return JSON.parse(b).score - JSON.parse(a).score;
  })
  
  return JSON.parse(values[0]).score
}

useEffect(() => {
  setTopScore(topScores())
})
  return (
    <Fragment>
            <Global
      styles={GlobalStyles}
    />
    <Routes>
      <Route path="/" element={<Start  reset={resetResults} />}/>
      <Route path="question" element={<Quiz update={updateResults} />} />
      <Route path="results" element={<Results results={results} store={storeResults} topscore={topscore}/>} />
    </Routes>
    </Fragment>
  );
}
