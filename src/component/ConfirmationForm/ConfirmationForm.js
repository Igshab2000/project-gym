import React from 'react';
import MainButton from '../UI/MainButton/MainButton';
import './ConfirmationForm.scss';

const ConfirmationForm = props => {
    const { tobook } = props;
    const style = {
        marginRight: '10px'
    }
    return (
        <div className='confirmation-form'>
            <h2>Вы уверены что хотите выполнить действие?</h2>
            <div className='confirmation-form__panel'>
                <MainButton
                    type='main'
                    styleCss={style}
                    onClick={() => tobook(true)}
                >
                    Да
                </MainButton>
                <MainButton
                    type='cancel'
                    styleCss={style}
                    onClick={() => tobook(false)}
                >
                    Отмена
                </MainButton>
            </div>
        </div>
    )
}

export default ConfirmationForm;