import * as React from "react";
import './Label.scss';


const Label = ({ styleCss, children}) => {
    return (
        <p
            className='label'
            style={styleCss}
        >
            {children}
        </p>
    );
  };
  
export default Label;