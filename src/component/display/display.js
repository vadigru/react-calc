import React from 'react';
import PropTypes from 'prop-types';

import './display.scss';

const Display = (props) => {
  const {
    displayColor,
    isCalcOn,
    isResult,
    isSqrtResult,
    isError,
    scale,
    showOnDisplay,
    total
  } = props;

  const styleDisplayNumbers = {
    fontSize: `${scale}px`
  };

  const styleDisplayColor = {
    backgroundColor: `${displayColor}`
  };

  const styleFontColor = {
    color: `${displayColor}`
  };

  return (
    <div className={`display display${isCalcOn ? `--on` : `--off`}`} style={styleDisplayColor}>
      <ul className={`display__indicators indicators`}>
        <li className={`indicators__item indicators__res indicators__item${isResult ? `--on` : `--off`}`} style={styleFontColor}>RES</li>
        <li className={`indicators__item indicators__sqrt indicators__item${isSqrtResult ? `--on` : `--off`}`} style={styleFontColor}>SQRT</li>
        <li className={`indicators__item indicators__err indicators__item${isError ? `--err-on` : `--err-off`}`} style={styleFontColor}>ERR</li>
        <li className={`indicators__item indicators__total indicators__item${isCalcOn ? `--total-on` : `--total-off`}`}>{total}</li>
      </ul>

      <span className={`display__numbers display__numbers${isCalcOn ? `--on` : `--off`}`} style={styleDisplayNumbers}>
        {showOnDisplay}
      </span>
    </div>
  );
};

Display.propTypes = {
  displayColor: PropTypes.string.isRequired,
  isCalcOn: PropTypes.bool.isRequired,
  isResult: PropTypes.bool.isRequired,
  isSqrtResult: PropTypes.bool.isRequired,
  isError: PropTypes.bool.isRequired,
  scale: PropTypes.number.isRequired,
  showOnDisplay: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  total: PropTypes.string.isRequired
};

export default Display;
