import React from 'react';
import './ButtonHint.css';

const ButtonHint = (props) => {
  return(
    <div className='buttonHint' onClick={props.handleHintClick}>take a hint: {props.data}</div>
  )
}

export default ButtonHint;