import React from 'react';
import './Display.scss';

const Display = (props) => {
  const {showOnDisplay, isCalcOn} = props;
  return(
    <div className={`display display${isCalcOn ? `--on` : `--off`}`}>
      <span>{showOnDisplay}</span>
    </div>
  )
}

export default Display;
