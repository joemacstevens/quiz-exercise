/** @jsxImportSource @emotion/react */
import { Fragment, useEffect, useState, useRef } from 'react';
import useFetch from 'react-fetch-hook';
import { useNavigate } from 'react-router-dom';
import { Question } from './Question';
import { css } from '@emotion/react';
import Lottie from "lottie-react";
import correctAnimation from "../correct.json";
import { Grid, GridAside, GridItem } from './styles/Grid';
import { Hero,Container, Countdown} from './styles/Styles';

const url = "http://demo6417400.mockable.io/music";

export const Quiz = ({update}) => {
  const { isLoading, data } = useFetch(url);
  const [currentQuestion, setCurrent] = useState(0);
  const [counter, setCounter] = useState(20);
  const [expired, setExpired] = useState(false);
  const [correct, setCorrect] = useState(false);

  let navigate = useNavigate();
  const intervalRef = useRef();
  const correctRef = useRef();

  intervalRef.current = counter

  const onUpdate = (correct) => {
    update(correct);
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
    if (correct) {
      correctRef.current.goToAndPlay(0)
    }
  }, [correct])

  useEffect(() => {
    setCounter(60);
    setExpired(false);
    setCorrect(false);
    const _timer = setInterval(() => {
      if (intervalRef.current === 0) {
        clearInterval(_timer);
        setExpired(true);

      } else {
        setCounter(intervalRef.current - 1);
      }
    }, 1000);
    return () => clearInterval(_timer); // clean up 
  }, [currentQuestion])

  if (isLoading) {
    return <div
      css={css`width: 100vw; 100vh; display: flex; justify-content: center; align-items: center;`}
    ><h1>Loading...</h1></div>;
  } else {
    return (
      <Fragment>
        <Grid>
          <GridAside>
            <Hero>
              <Lottie lottieRef={correctRef} animationData={correctAnimation} autoplay={false} />
              <Countdown><Status /></Countdown>
            </Hero>
          </GridAside>
          <GridItem>
            <Container>
              <Question
                question={data.results[currentQuestion]}
                count={currentQuestion + 1}
                onUpdate={onUpdate} onNext={onNext} expired={expired} />
            </Container>
          </GridItem>
        </Grid>
      </Fragment>
    )
  }

}