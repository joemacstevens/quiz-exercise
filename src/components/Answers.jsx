/** @jsxImportSource @emotion/react */
import { Fragment, useEffect, useState } from 'react';
import uuid from 'react-uuid';
import { css, keyframes } from '@emotion/react'

export const Answers = (props) => {
    const [options, setOptions] = useState([]);
    const [answered, setAnswered] = useState(false);
    const [result, setResult] = useState(false);

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
            return <button onClick={handleNext}>Next ▶</button>
        } else {
            return <button onClick={handleClick}>Sumbit &#10003;</button>
        }
    }

    useEffect(() => {
        if (props.expired) {
            handleClick();
        }
    }, [props.expired]);

    return (
        <Fragment>
            <div css={css`
                width:100%;
                display: flex;
                flex-direction: column;
                `}>
                {options.map((item, index) => {
                    if (props.questionType === "multiple") {
                        return <label><input disabled={answered} onChange={handleChange} checked={props.selectedAnswer.includes(item)} type="checkbox" value={item} key={uuid()} name={props.qid} /><span>{item} </span></label>
                    } else {
                        return <label><input disabled={answered} onChange={handleChange} checked={props.selectedAnswer.includes(item)} type="radio" value={item} name={props.qid} key={uuid()} /><span>{item} </span></label>
                    }

                })}
                <div><CheckButton /></div>
            </div>
        </Fragment>
    );
}