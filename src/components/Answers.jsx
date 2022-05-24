/** @jsxImportSource @emotion/react */
import { Fragment, useEffect, useState } from 'react';
import uuid from 'react-uuid';

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
        if(answered) {
            return <button onClick={handleNext}>Next</button>
        } else {
            return <button onClick={handleClick}>Check</button>
        }
    }

    const Result = () => {
        if(answered && result) {
            return <div>Correct</div>
        } else if(answered && !result) {
            return <div>Incorrect</div>
        } else {
            return null
        }
    }

    return (

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
    );
}