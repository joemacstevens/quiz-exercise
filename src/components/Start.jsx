/** @jsxImportSource @emotion/react */
import { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { css} from '@emotion/react'
import tape from './images/tape.png';
import styled from '@emotion/styled';

export const Grid = styled('section')`
    max-width: 1024px;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(3, 1fr);
    grid-column-gap: 10px;
    grid-row-gap: 10px;
    margin: 0 auto;
`
export const GridItem = styled('div')` 
    padding: .5em;
    display: flex;
    flex-direction: column;
    align-items: self-start;
    justify-content: center;
`

export const GridImage = styled('div')` 
    padding: 2em;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

export const Start = (props) => {
    useEffect(() => {
        props.reset();
    }, []);

    return (
        <Fragment>
            <Grid>
                <GridImage>
            <header>
        <img src={tape} alt="tape" css={css`width:100%; min-width: 200px`}/>
        </header>
        </GridImage>      
        <GridItem>
        <div> 
        <h1>&#127925; Musica &#9836;</h1>
        <h3>Test your knowledge of music  <br /> with our six question quiz.</h3>
        <Link to="/question">Play &#9658;</Link>
        </div>
        </GridItem>
        </Grid>
        </Fragment>
    )
}