import React from 'react';
import './MainButton.scss';

const MainButton = props => {
    const cls = [
        'main-button'
    ];

    if(props.type === 'main') {
        cls.push('main');
    } else if(props.type === 'reservation') {
        cls.push('reservation');
    } else if(props.type === 'cancel') {
        cls.push('cancel')
    }

    return (
        <button
            className={cls.join(' ')}
            onClick={props.onClick}
            style={props.styleCss ? props.styleCss : null}
        >
            {props.children}
        </button>
    )
}

export default MainButton;