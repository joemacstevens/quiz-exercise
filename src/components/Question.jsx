/** @jsxImportSource @emotion/react */
import { Fragment, useEffect, useState, useRef } from 'react';
import { Answers } from './Answers';
import { QuestionHeading } from './Quiz';
import { css } from '@emotion/react'
import styled from '@emotion/styled';

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

export const Question = (props) => {
  const { question, onUpdate, count } = props;
  const [answer, setAnswer] = useState([]);
  const [questionType, setQuestionType] = useState('single');
  const [counter, setCounter] = useState(90);

  const intervalRef = useRef();
  intervalRef.current = counter
 
  const handleAnswer = (option) => {
    if (questionType === 'multiple') {
      if (answer.includes(option)) {
        setAnswer(answer.filter((item) => item !== option));
      } else {
        setAnswer([...answer, option]);
      }
    } else {
      setAnswer([option]);
    }
  }

  const checkAnswer = () => {
    const correct = answer.every(item => {
      return question.correct_answer.includes(item);
    })

    if (correct) {
     onUpdate(true);
      return true
    } else {
      onUpdate(false);
      return false
    }
  }

  useEffect(() => {

    if (question.correct_answer.length > 1) {
      setQuestionType('multiple');
    } else {
      setQuestionType('single');
    }
    setAnswer([]);
  }, [question]);
useEffect(() => {
  setCounter(90)
  const _timer = setInterval(() => {
    if (intervalRef.current == 0) {
      clearInterval(_timer);
    } else {
      setCounter(intervalRef.current - 1);
    }
  }, 1000);
  return () => clearInterval(_timer); // clean up 
}, [props.count])

  return (
    <Fragment>
                  <Timer>
            <div css={css`position:absolute`}>{counter}</div>
              <svg css={css`width: 60px;
    height: 60px;
    margin-top: 0;`}>
                <circle css={css`  stroke-dasharray: 203px;
  stroke-dashoffset: 0px;
  stroke-linecap: round;
  stroke-width: 5px;
  stroke: white;
  fill: white;`} r="25" cx="30" cy="30">
                 
                </circle>
              </svg>

            </Timer>

      <QuestionHeading>
      <p>Question {count}/6</p> 
        <h3>{question.question}</h3></QuestionHeading>
      <Answers
        options={question.correct_answer.concat(props.question.incorrect_answers)}
        questionType={questionType}
        qid={question.qid}
        onAnswer={handleAnswer}
        onNext={props.onNext}
        onCheckAnswer={checkAnswer}
        selectedAnswer={answer}
      />

     </Fragment>
  )

}
