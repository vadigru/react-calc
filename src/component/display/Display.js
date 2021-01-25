import React from 'react';
import './Display.scss';

const Display = (props) => {
  const {showOnDisplay, isCalcOn, scale} = props;

  const style = {
    fontSize: `${scale}px`
  }

  return(
    <div className={`display display${isCalcOn ? `--on` : `--off`}`} style={style}>
      <span className={`display-numbers`}> 
        {showOnDisplay}
      </span>
    </div>
  )
}

export default Display;
