/** @jsxImportSource @emotion/react */
import { useEffect, Fragment, useRef } from 'react';
import { Link } from 'react-router-dom';
import Disk from './images/disk.png';
import { css, useTheme } from '@emotion/react'
import Lottie from "lottie-react";
import celebrateAnimation from "../celebration.json";
import {Grid, GridAside , GridItem} from './styles/Grid';
import { ResHero,Container, Score, Saved} from './styles/Styles';

export const Results = ({store, results, topscore}) => {

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
        store(new Date().getTime());
    }, []);

    return (
        <Fragment>
            <Grid>
                <GridAside >
                   <ResHero>
                   <Lottie lottieRef={celebrateRef} animationData={celebrateAnimation} autoplay={true}/>

                        <Saved>
                       <img src={Disk} alt="disk" css={css`width:100%; position: absolute;`}/>
                      <Score>{results.score}</Score>
                      </Saved>
                   <div></div>
                   
                   </ResHero>
                   </GridAside>
                   <GridItem>
        <Container css={css`width: 100%;`}>
         
        <div css={css`width: 100%;  display: flex; flex-direction: column`}>
                <div>{results.score >= topscore ? <h1 css={css`color: ${theme.colors.champagne }; margin-bottom:0`}>New High Score!</h1> : <h1 css={css`color: ${theme.colors.champagne }; margin-bottom:0`}>Your Score!</h1>}</div>
                <p>Correct: {results.correct}<br />
                Incorrect: {results.incorrect}</p>
                <Link to="/"><button>Start Again</button></Link>
            </div>
            <div css={css`margin-left: 1em`}>
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
        </div>
            </Container>
            </GridItem>
            </Grid>
        </Fragment>
    )
}