/** @jsxImportSource @emotion/react */
import { Fragment, useEffect, useState, useRef } from 'react';
import uuid from 'react-uuid';
import { css } from '@emotion/react'
import styled from '@emotion/styled';

export const Timer = styled('div')`
position: absolute;
z-index: 10;
top: 130px;
height: 40px;
width: 35vw;
display: flex;
justify-content: center;
align-items: center;
`
export const Countdown = styled('div')`
  font-size: 2em;`;

export const Answers = (props) => {
    const [options, setOptions] = useState([]);
    const [answered, setAnswered] = useState(false);
    const [result, setResult] = useState(false);
    const [counter, setCounter] = useState(90);

    const intervalRef = useRef();
    intervalRef.current = counter

    useEffect(() => {
        setOptions(props.options);
    }, [props.options]);

    const handleClick = () => {
        setResult(props.onCheckAnswer());
        setAnswered(true);
    }

    const handleNext = () => {
        props.onNext();
        setAnswered(false);
        setResult(false);
    }
    const handleChange = (event) => {
        props.onAnswer(event.target.value);
    }

    const CheckButton = (event) => {
        if (answered) {
            return <button onClick={handleNext}>Next</button>
        } else {
            return <button onClick={handleClick}>Check</button>
        }
    }

    const Result = () => {
        if (answered && result) {
            return <div>Correct</div>
        } else if (answered && !result) {
            return <div>Incorrect</div>
        } else {
            return null
        }
    }

    useEffect(() => {
        setCounter(10)
        const _timer = setInterval(() => {
            if (intervalRef.current == 0) {
                clearInterval(_timer);
                handleClick();
                
            } else {
                setCounter(intervalRef.current - 1);
            }
        }, 1000);
        return () => clearInterval(_timer); // clean up 
    }, [props.options]);

    return (
        <Fragment>
            <Timer>
                <div css={css`position:absolute`}>{counter}</div>
                <svg css={css`width: 60px;
height: 60px;
margin-top: 0;`}>
                    <circle css={css`  stroke-dasharray: 203px;
stroke-dashoffset: 0px;
stroke-linecap: round;
stroke-width: 5px;
stroke: white;
fill: white;`} r="25" cx="30" cy="30">

                    </circle>
                </svg>

            </Timer>
            <div >
                {options.map((item, index) => {
                    if (props.questionType === "multiple") {
                        return <p><input disabled={answered} onChange={handleChange} checked={props.selectedAnswer.includes(item)} type="checkbox" value={item} key={uuid()} name={props.qid} />{item} </p>
                    } else {
                        return <p><input disabled={answered} onChange={handleChange} checked={props.selectedAnswer.includes(item)} type="radio" value={item} name={props.qid} key={uuid()} />{item}</p>
                    }

                })}
                <div><CheckButton /></div>
                <div><Result /></div>
            </div>
        </Fragment>
    );
}