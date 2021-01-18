import React from 'react';
import './Display.scss';

const Display = (props) => {
  const {showOnDisplay, isCalcOn} = props;
  return(
    <div className={`display display${isCalcOn ? `--on` : `--off`}`}>
      <span className={`display-numbers`}> 
        <span>{showOnDisplay}</span>
      </span>
    </div>
  )
}

export default Display;
