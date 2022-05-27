/** @jsxImportSource @emotion/react */
import { Fragment, useEffect, useState, useRef } from 'react';
import useFetch from 'react-fetch-hook';
import { useNavigate } from 'react-router-dom';
import { Question } from './Question';
import styled from '@emotion/styled';
import Lottie from "lottie-react";
import correctAnimation from "../correct.json";
import {Grid, GridAside , GridItem} from './Grid';

export const Container = styled('div')` 
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: baseline;
;`;

export const Hero = styled('div')`
background: #7fa89f;
  clip-path: ellipse(85% 80% at 0% 50%);
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: 450px) {
    clip-path: ellipse(85% 100% at 50% 0%);
    height: 100%;
  }
}
`;

export const Countdown = styled('div')`
  font-size: 20em;
  color: #f9e6d4;
  position: absolute;
  margin-left: -100px;
  @media (max-width: 450px) { 
    font-size: 15em;
    margin-left: 0;
  }
  `

const url = "http://demo6417400.mockable.io/music";

export const Quiz = (props) => {
  const { isLoading, error, data } = useFetch(url);
  const [currentQuestion, setCurrent] = useState(0);
  const [counter, setCounter] = useState(20);
  const [expired, setExpired] = useState(false);
  const [correct, setCorrect] = useState(false);


  let navigate = useNavigate();


  const intervalRef = useRef();
  const correctRef = useRef();

  intervalRef.current = counter

  const onUpdate = (correct) => {
    props.update(correct);
    setCorrect(correct);
    setExpired(true);
  }

  const onNext = () => {
    if (data.results.length > currentQuestion + 1) {
      setCurrent(currentQuestion + 1)
    } else {
      navigate("/results", { replace: true });
    }
  }

  const Status = () => { 
   if (correct) { 
      return <div>&#10003;</div>
    } else {
      return !expired ? <div>{counter}</div> : <div>&#10007;</div>
    }
  }

useEffect(() => {
  if (correct){
    correctRef.current.goToAndPlay(0)
  }
},[correct])

  useEffect(() => {
    setCounter(60);
    setExpired(false);
    setCorrect(false);
    const _timer = setInterval(() => {
        if (intervalRef.current == 0) {
            clearInterval(_timer);
            setExpired(true);
            
        } else {
            setCounter(intervalRef.current - 1);
        }
    }, 1000);
    return () => clearInterval(_timer); // clean up 
  },[currentQuestion])

  if (isLoading) {
    return <div>Loading...</div>;
  } else {
    return (
      <Fragment>
        <Grid>
          <GridAside>
        <Hero>
        <Lottie lottieRef={correctRef} animationData={correctAnimation} autoplay={false}/>
        
        <Countdown><Status /></Countdown> 
        </Hero>
        </GridAside>
        <GridItem>
        <Container>
            <Question
              question={data.results[currentQuestion]}
              count={currentQuestion + 1}
              onUpdate={onUpdate} onNext={onNext} expired={expired}/>
        </Container>
        </GridItem>
        </Grid>
      </Fragment>
    )
  }

}