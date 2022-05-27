/** @jsxImportSource @emotion/react */
import { Fragment, useEffect, useState } from 'react';
import { Answers } from './Answers';
import { css} from '@emotion/react'

export const Question = (props) => {
  const { question, onUpdate, count, expired } = props;
  const [answer, setAnswer] = useState([]);
  const [questionType, setQuestionType] = useState('single');

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

    if (answer.length !== question.correct_answer.length) {
      return false;
    }

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

  return (
    <Fragment>
      <div css={css`@media (max-width: 450px){
       text-align:center;
       width: 100%;
     }`}>
        <strong>Question {count} | 6</strong>
      </div>
      <header css={css`@media (max-width: 450px){
        padding: 0 1em;
      }`}>
        <h1>{question.question}</h1>
      </header>
      <div css={css`
          margin-bottom: 1em;
          width: 100%;
        `}>
        <Answers
          options={question.correct_answer.concat(props.question.incorrect_answers)}
          questionType={questionType}
          qid={question.qid}
          onAnswer={handleAnswer}
          onNext={props.onNext}
          onCheckAnswer={checkAnswer}
          selectedAnswer={answer}
          expired={expired}
        />
      </div>
    </Fragment>
  )

}
