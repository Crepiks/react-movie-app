import React from 'react';
import './Error.css';

const Error = (props) => {
    return (
        <div className="error">
            <h1 className="error__heading">{props.text}</h1>
        </div>
    );
}

Error.defaultProps = {
    text: ''
}

export default Error;