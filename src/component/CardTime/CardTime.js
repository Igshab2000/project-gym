import React from 'react';
import './CardTime.scss';

const CardTime = props => {
    const { time, trainer, color, background } = props;
    return (
        <div 
            className='cardTime' 
            style={{
                borderLeft: '5px solid ' + color,
                backgroundColor: background
            }}
            onClick={props.add}
        >
            <div className="cardTime__content">
                <div className="cardTime__content-inf">Время:</div>
                <div>{time}</div>
                <div className="cardTime__content-inf">Тренер:</div>
                <div>{trainer}</div>
            </div>
        </div>
    )
}

export default CardTime;