import React from 'react';
import PropTypes from 'prop-types';

import './display.scss';

const Display = (props) => {
  const {
    isCalcOn,
    isResult,
    isSqrtResult,
    isError,
    scale,
    showOnDisplay,
    total
  } = props;

  const style = {
    fontSize: `${scale}px`
  };

  return (
    <div className={`display display${isCalcOn ? `--on` : `--off`}`}>
      <span className={`display__result display__result${isResult ? `--on` : `--off`}`}>RES</span>
      <span className={`display__result-sqrt display__result-sqrt${isSqrtResult ? `--on` : `--off`}`}>SQRT</span>
      <span className={`display__result-error display__result-error${isError ? `--on` : `--off`}`}>ERR</span>
      <span className={`display__result-total display__result-total${isCalcOn ? `--on` : `--off`}`}>{total}</span>
      <span className={`display__numbers`} style={style}>
        {showOnDisplay}
      </span>
    </div>
  );
};

Display.propTypes = {
  isCalcOn: PropTypes.bool,
  isResult: PropTypes.bool,
  isSqrtResult: PropTypes.bool,
  isError: PropTypes.bool,
  scale: PropTypes.number,
  showOnDisplay: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  total: PropTypes.string
};

export default Display;
