import styled from '@emotion/styled';
import { css} from '@emotion/react';

export const theme = {
    colors: {
      gravel: "#464047",
      sea: "#7fa89f",
      champagne: "#f9e6d4",
      dove: "#646464",
      shadow_green: "#9bbcbb",
      sorrell_brown: "#c7a084",
      pumice: "#bbc2ba",
      brandy: "#dbb490",
      arrowtown: "#927e6a",
    }
  }
  
export const GlobalStyles = css`
  body {
    font-family: 'Poppins', sans-serif;
    width: 100vw;
    height: 100vh;
    margin: 0;
    padding: 0;
    background: ${theme.colors.gravel};
  }

  label { 
    padding: .8em;
    display: block;
  }
  
  label span { 
   margin-left: .2em;
   display: inline-block;
  }

  label, p, strong {
    color: ${theme.colors.champagne};
  }
  a { 
    text-decoration: none;
    color: ${theme.colors.sea};
  }

  strong {
    font-weight: 600;
    color: ${theme.colors.pumice};
  }

  button {
    border: none;
    border-radius: 50px;
    font-family: 'Poppins', sans-serif;
    width: 50%;
    padding: .5em;
    background: ${theme.colors.sea};
    color: ${theme.colors.gravel};
    text-transform: uppercase;
    cursor: pointer;
    font-weight: 600;
    font-size: 1em;
    margin-top: 1em;
    transition: all 0.2s ease-in-out;
    &:hover {
      background: ${theme.colors.champagne};
      color: ${theme.colors.sea};
    }
    &:focus {
      background: ${theme.colors.brandy};
      color: ${theme.colors.champagne};
    }
    @media (max-width: 450px) { 
      width: 60%;
  }

  }

  h1,h2,h3,h4,h5,h6 {
    font-family: 'Abril Fatface', cursive;
    color: ${theme.colors.champagne};
  }
  `

export const Container = styled('div')` 
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: baseline;
;`;

export const Hero = styled('div')`
background: #7fa89f;
  clip-path: ellipse(85% 80% at 0% 50%);
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: 450px) {
    clip-path: ellipse(85% 100% at 50% 0%);
    height: 100%;
  }
}
`;

export const Countdown = styled('div')`
  font-size: 20em;
  color: #f9e6d4;
  position: absolute;
  margin-left: -100px;
  @media (max-width: 450px) { 
    font-size: 10em;
    margin-left: 0;
  }
  `

  export const Score = styled('h4')`
  display: flex;
  justify-content: center;
  font-family: 'Abril Fatface',cursive;
  color: #464047;
  position: absolute;
  font-size: 4.7em;
  bottom: -210px;
  @media (max-width: 768px) {
    bottom: -190px;
  }
  @media (max-width: 450px) {
    bottom: -121px;
    font-size: 3em;
  }
  `
  export const ResHero = styled('div')`
  background: #464047;
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: 450px) {
    height: 35vh;
  }
}
`;

  export const Saved = styled('div')` 
  display: flex;
  width: 30vw;
  position: absolute;
  align-items: center;
    justify-content: center;
  top: 310px;
  left: 120px;
  @media (max-width: 450px) {
    top: 130px;
    left: 80px;
    width: 50vw;
  }
  `
