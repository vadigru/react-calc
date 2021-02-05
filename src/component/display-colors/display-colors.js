import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import Context from '../../context.js';
import {DISPLAY_COLORS} from '../../const.js';

import './display-colors.scss';

const DisplayColors = () => {
  const {
    changeDisplayColor,
    displayColor,
    onOff,
  } = useContext(Context);

  return (
    <div className="solar" onClick={(evt) => changeDisplayColor(evt)}>
      {DISPLAY_COLORS.map((color, i) => {
        return (
          i === 0 ?
            <div
              key={i}
              className={`solar__tile solar__tile${onOff && displayColor === color ? `--active` : ``}`}
              style={{backgroundColor: color}}
            >
            </div> :
            <div
              key={i}
              className={`solar__tile solar__tile${displayColor === color ? `--active` : ``}`}
              style={{backgroundColor: color}}
            >
            </div>
        );
      })}
    </div>
  );
};

DisplayColors.propTypes = {
  context: PropTypes.shape({
    changeDisplayColor: PropTypes.func.isRequired,
    displayColor: PropTypes.string.isRequired,
    onOff: PropTypes.bool.isRequired,
  })
};

export default DisplayColors;
