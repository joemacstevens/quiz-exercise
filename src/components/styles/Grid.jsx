import styled from '@emotion/styled';

export const Grid = styled('section')`
    display: grid;
    grid-template-columns: repeat(2,1fr);
    grid-template-rows: repeat(3, 1fr);
    grid-column-gap: 10px;
    grid-row-gap: 10px;
    margin: 0 auto;
    max-height: 100vh;
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
export const GridAside = styled('aside')`
    display: flex;
    padding: 0;
    height: 100vh;
    align-items: center;
    @media (max-width: 450px) {
        height: 35vh;
    }

`