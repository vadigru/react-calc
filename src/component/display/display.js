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
      <ul className={`display__indicators indicators`}>
        <li className={`indicators__item indicators__res indicators__item${isResult ? `--on` : `--off`}`}>RES</li>
        <li className={`indicators__item indicators__sqrt indicators__item${isSqrtResult ? `--on` : `--off`}`}>SQRT</li>
        <li className={`indicators__item indicators__err indicators__item${isError ? `--err-on` : `--err-off`}`}>ERR</li>
        <li className={`indicators__item indicators__total indicators__item${isCalcOn ? `--total-on` : `--total-off`}`}>{total}</li>
      </ul>

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
