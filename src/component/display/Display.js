import React from 'react';
import PropTypes from 'prop-types';

import './Display.scss';

const Display = (props) => {
  const {
    isCalcOn,
    scale,
    showOnDisplay,
  } = props;

  const style = {
    fontSize: `${scale}px`
  };

  return (
    <div className={`display display${isCalcOn ? `--on` : `--off`}`} style={style}>
      <span className={`display-numbers`}>
        {showOnDisplay}
      </span>
    </div>
  );
};

Display.propTypes = {
  isCalcOn: PropTypes.bool,
  scale: PropTypes.number,
  showOnDisplay: PropTypes.string,
};

export default Display;
