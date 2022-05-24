/** @jsxImportSource @emotion/react */
import { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export const Start = (props) => {
    useEffect(() => {
        props.reset();
    }, []);

    return (
        <Fragment>
        <div>Welcome to Music Quiz</div>
        <Link to="/question">Start</Link>
        </Fragment>
    )
}