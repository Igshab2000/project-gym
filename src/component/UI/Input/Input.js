import React from 'react';
import './Input.scss';
import { Field } from 'redux-form';

const Input = props => {
    const {input} = props;
    return (
        <div className='inputContainer'>
          <input
            type={props.type}
            className='input'
            placeholder={props.placeholder}
            style={props.styleCss}
            {...input}
          />
          {props.meta?.touched && props.meta.invalid ? <span>{props.meta.error}</span> : null}
        </div>
    );
  };

  const InputField = props => {
      return (
        <Field name={props.name} component={Input} {...props} />
      )
  }

  export default InputField;