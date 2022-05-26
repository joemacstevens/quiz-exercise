/** @jsxImportSource @emotion/react */
import { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { css,useTheme } from '@emotion/react'
import tape from './images/tape.png';
import styled from '@emotion/styled';


export const Grid = styled('section')`
    max-width: 1024px;
    display: grid;
    grid-template-columns: repeat(2,1fr);
    grid-template-rows: repeat(3, 1fr);
    grid-column-gap: 10px;
    grid-row-gap: 10px;
    margin: 0 auto;

    @media (max-width: 450px) { 
        grid-template-columns: repeat(1, 1fr);
    }
    
`
export const GridItem = styled('div')` 
    padding: .5em;
    display: flex;
    flex-direction: column;
    align-items: self-start;
    justify-content: center;
    max-width: 100vw;
    @media (max-width: 450px) { 
        justify-content: start;
        text-align: center;
    }
`

export const GridImage = styled('div')` 
    padding: 2em;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`
export const Start = (props) => {

    const theme = useTheme();

    useEffect(() => {
        props.reset();
    }, []);

    return (
            <Grid css={css`max-height: 100vh`}>
                <GridImage>
            <header css={css`text-align: center;`}>
            <h1 css={css`
            display: none;
            font-size: 3em;
            margin-bottom: 0;
            color: ${theme.colors.sea};
            @media (max-width: 450px) { 
            display: inline-block;
            
        }`}>&#9836; Musica </h1>
        <img src={tape} alt="tape" css={css`width:100%; min-width: 200px`}/>
        </header>
        </GridImage>      
        <GridItem>
        <div css={css`width: 100%; @media (max-width: 450px) {
            text-align: center;
        }`}> 
        <h1 css={css`
         font-size: 3em;
         color: ${theme.colors.sea};
         margin-bottom: .1em;
        @media (max-width: 450px) { 
            display: none;
           
        }`}>&#9836; Musica </h1>
        <p css={css` 
          @media (max-width: 450px) { text-align: center; margin-top: -50px; text-align: center;}
          color: ${theme.colors.champagne};
        `}>Test your knowledge of music.</p>
        <Link to="/question">
            <button>Play &#9658;</button>
        </Link>
        </div>
        </GridItem>
        </Grid>
    )
}