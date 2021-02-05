import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import Context from '../../context.js';

import './display.scss';

const Display = () => {
  const {
    displayColor,
    onOff,
    result,
    sqrtResult,
    error,
    scale,
    display,
    total
  } = useContext(Context);

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
    <div className={`display display${onOff ? `--on` : `--off`}`} style={styleDisplayColor}>
      <ul className={`display__indicators indicators`}>
        <li className={`indicators__item indicators__res indicators__item${result ? `--on` : `--off`}`} style={styleFontColor}>RES</li>
        <li className={`indicators__item indicators__sqrt indicators__item${sqrtResult ? `--on` : `--off`}`} style={styleFontColor}>SQRT</li>
        <li className={`indicators__item indicators__err indicators__item${error ? `--err-on` : `--err-off`}`} style={styleFontColor}>ERR</li>
        <li className={`indicators__item indicators__total indicators__item${onOff ? `--total-on` : `--total-off`}`}>{total}</li>
      </ul>

      <span className={`display__numbers display__numbers${onOff ? `--on` : `--off`}`} style={styleDisplayNumbers}>
        {display}
      </span>
    </div>
  );
};

Display.propTypes = {
  context: PropTypes.shape({
    displayColor: PropTypes.string.isRequired,
    onOff: PropTypes.bool.isRequired,
    result: PropTypes.bool.isRequired,
    sqrtResult: PropTypes.bool.isRequired,
    error: PropTypes.bool.isRequired,
    scale: PropTypes.number.isRequired,
    display: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    total: PropTypes.string.isRequired
  })
};

export default Display;
