/** @jsxImportSource @emotion/react */
import { useEffect, Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import {QuestionHeading, Card, Hero, Container} from './Quiz';
import {Badge} from './Badge';
import { css, keyframes } from '@emotion/react'
import styled from '@emotion/styled';

export const Score = styled('div')`
  display: flex;
  justify-content: center;
  font-family: 'Abril Fatface', cursive;`

export const Results = (props) => {

    const showScores = () => {
        let values = [],
            keys = Object.keys(localStorage),
            i = keys.length;

        while (i--) {
            values.push(localStorage.getItem(keys[i]));
        }

        values.sort((a,b) => {
            return JSON.parse(b).score - JSON.parse(a).score;
        })

        return values;
    }

    useEffect(() => {
        props.store(new Date().getTime());
       
    }, []);

    return (
        <Fragment>
                   <Hero>
                   <div css={css`width:170px;`}>
                       <Badge score={props.results.score}/></div>
                   <div></div>
                   {props.results.score >= props.topscore ? <div>New High Score!</div> : null}
                   </Hero>
        <Container>
          <Card>
            <div>
                <div>Results</div>
                <div>Correct: {props.results.correct}</div>
                <div>Incorrect: {props.results.incorrect}</div>
            
            </div>
            <div>
                <Link to="/">Start Again</Link>
            </div>
            <div>Previous Scores</div>
            {showScores().map((item, index) => {
                return <div key={index}>{JSON.parse(item).score} {new Date(JSON.parse(item).time).getMonth()} / {new Date(JSON.parse(item).time).getDate()}  </div>
            })}
            </Card>
            </Container>
        </Fragment>
    )
}