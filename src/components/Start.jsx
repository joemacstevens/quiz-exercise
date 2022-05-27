/** @jsxImportSource @emotion/react */
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { css,useTheme } from '@emotion/react'
import tape from './images/tape.png';
import {Grid, GridImage, GridItem} from './styles/Grid';


export const Start = ({reset}) => {

    const theme = useTheme();

    useEffect(() => {
        reset();
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
          font-size: 1.5em;
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