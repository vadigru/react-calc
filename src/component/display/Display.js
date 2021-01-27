import React from 'react';
import PropTypes from 'prop-types';

import './Display.scss';

const Display = (props) => {
  const {
    isCalcOn,
    isResultOn,
    isSqrtResultOn,
    scale,
    showOnDisplay,
  } = props;

  const style = {
    fontSize: `${scale}px`
  };

  return (
    <div className={`display display${isCalcOn ? `--on` : `--off`}`} style={style}>
      <span className={`display__result display__result${isResultOn ? `--on` : `--off`}`}>RES</span>
      <span className={`display__result-sqrt display__result-sqrt${isSqrtResultOn ? `--on` : `--off`}`}>SQRT</span>
      <span className={`display__numbers`}>
        {showOnDisplay}
      </span>
    </div>
  );
};

Display.propTypes = {
  isCalcOn: PropTypes.bool,
  isResultOn: PropTypes.bool,
  isSqrtResultOn: PropTypes.bool,
  scale: PropTypes.number,
  showOnDisplay: PropTypes.string,
};

export default Display;
