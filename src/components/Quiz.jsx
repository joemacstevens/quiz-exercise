/** @jsxImportSource @emotion/react */
import { Fragment, useEffect, useState, useRef } from 'react';
import useFetch from 'react-fetch-hook';
import { useNavigate } from 'react-router-dom';
import { Question } from './Question';
import styled from '@emotion/styled';
import { css } from '@emotion/react'


export const QuestionHeading = styled('header')`
  font-size: 1.2em;
  font-family: 'Abril Fatface', cursive;
  background: rgba( 255, 255, 255, 0.6);
  box-shadow: 0 2px 20px 0 rgba( 31, 38, 135, 0.37 );
  backdrop-filter: blur( 4px );
  -webkit-backdrop-filter: blur( 4px );
  border-radius: 10px;
  border: 1px solid rgba( 255, 255, 255, 0.18 );
  padding: 1em;
`
export const Card = styled('div')` 

  margin-top: 27vh;
  text-align: center;
  max-width: 400px;
  height: 15vh;
`;

export const Container = styled('div')` 
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
;`;

export const Hero = styled('div')`
background: linear-gradient(90deg, #1CB5E0 0%, #000851 100%);
  clip-path: ellipse(85% 100% at 50% 0%);
  height: 35vh;
  position: fixed;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
}
`;

export const Timer = styled('div')`
position: absolute;
z-index: 10;
margin-top: -22px;
height: 40px;
width: 35vw;
display: flex;
justify-content: center;
align-items: center;
`
export const Countdown = styled('div')`
  font-size: 2em;`;

const url = "http://demo6417400.mockable.io/music";

export const Quiz = (props) => {
  const { isLoading, error, data } = useFetch(url);
  const [currentQuestion, setCurrent] = useState(0);

  let navigate = useNavigate();

  const onUpdate = (correct) => {
    props.update(correct);
  }

  const onNext = () => {
    if (data.results.length > currentQuestion + 1) {
      setCurrent(currentQuestion + 1)
    } else {
      navigate("/results", { replace: true });
    }
  }

  if (isLoading) {
    return <div>Loading...</div>;
  } else {
    return (
      <Fragment>
        <Hero></Hero>
        <Container>
          <Card>

            <Question
              question={data.results[currentQuestion]}
              count={currentQuestion + 1}
              onUpdate={onUpdate} onNext={onNext} />
          </Card>


        </Container>
      </Fragment>
    )
  }

}