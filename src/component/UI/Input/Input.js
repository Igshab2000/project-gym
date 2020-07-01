import React from 'react';
import './Input.scss';
import { Field } from 'redux-form';

const Input = props => {
    const { input, type, placeholder, styleCss, meta, styleSpan } = props;
    let style = {};
    if(meta?.touched && meta.invalid) {
      style = {
        ...styleCss,
        border: '2px solid red',
      } 
      console.log('input ', style);
    } else {
      style = {
        ...styleCss
      }
    }

    return (
        <div className='input-container'>
          <input
            type={type}
            className='input'
            placeholder={placeholder}
            style={style}
            {...input}
          />
          {meta?.touched && meta.invalid ? 
            <span 
              className="span-message" 
              style={styleSpan ? styleSpan : null}
            >
              {meta.error}
            </span> 
            : 
            null}
        </div>
    );
  };

  const InputField = props => {
      return (
        <Field name={props.name} component={Input} {...props} />
      )
  }

  export default InputField;