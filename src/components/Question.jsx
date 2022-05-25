/** @jsxImportSource @emotion/react */
import { Fragment, useEffect, useState, useRef } from 'react';
import { Answers } from './Answers';
import { QuestionHeading } from './Quiz';
import { css } from '@emotion/react'
import styled from '@emotion/styled';



export const Question = (props) => {
  const { question, onUpdate, count } = props;
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
