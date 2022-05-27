/** @jsxImportSource @emotion/react */
import { useEffect, Fragment, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Hero, Container} from './Quiz';
import {Badge} from './Badge';
import { css, useTheme } from '@emotion/react'
import styled from '@emotion/styled';
import Lottie from "lottie-react";
import celebrateAnimation from "../celebration.json";
import {Grid, GridAside , GridItem} from './Grid';

export const Score = styled('div')`
  display: flex;
  justify-content: center;
  font-family: 'Abril Fatface', cursive;`

export const Results = (props) => {

    const celebrateRef = useRef();
    const theme = useTheme();

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
            <Grid>
                <GridAside>
                   <Hero>
                   <Lottie lottieRef={celebrateRef} animationData={celebrateAnimation} autoplay={true}/>
                   <div css={css`width:170px; position: absolute;`}>
                   {props.results.score <= props.topscore ? <h1 css={css`color: ${theme.colors.gravel}`}>New High Score!</h1> : null}
                       <Badge score={props.results.score}/>
                      
                       </div>
                   <div></div>
                   
                   </Hero>
                   </GridAside>
                   <GridItem>
        <Container css={css`width: 100%;`}>
         
        <div css={css`width: 100%;  display: flex; flex-direction: column`}>
                <h1>Results</h1>
                <p>Correct: {props.results.correct}<br />
                Incorrect: {props.results.incorrect}</p>
            
           
                <Link to="/"><button>Start Again</button></Link>
            </div>
            <h3>Previous Scores</h3>
            <ul css={css`
                margin-left: 1em;
                padding: 0;
                color: ${theme.colors.shadow_green};
            `}>
            {showScores().map((item, index) => {
                if(index < 5) {
                return <li key={index}>{JSON.parse(item).score} {new Date(JSON.parse(item).time).toLocaleTimeString()} / {new Date(JSON.parse(item).time).toDateString()}  </li>
            } else {
                return null;
            }
            })}
        </ul>
            </Container>
            </GridItem>
            </Grid>
        </Fragment>
    )
}