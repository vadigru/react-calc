import PropTypes from 'prop-types';
import React from 'react';
import {CALC_BTNS, DISPLAY_COLORS, ValuesMap} from '../../const.js';

import './buttons.scss';

const Buttons = (props) => {
  const {
    buttonPress,
    changeDisplayColor,
    clearFocus,
    displayColor,
    isCalcOn,
  } = props;

  const setDisabled = (val) => {
    if (val === `on/off`) {
      return false;
    } else {
      return !isCalcOn;
    }
  };

  return (
    <>
      <div className="onoff-solar">
        <button
          className="onoff"
          id="onoff"
          onClick={
            (evt) => {
              buttonPress(evt);
              clearFocus(evt);
            }
          }
        >
          {isCalcOn ? `ON` : `OFF`}
        </button>
        <div className="solar" onClick={(evt) => changeDisplayColor(evt)}>
          {DISPLAY_COLORS.map((color, i) => {
            return (
              i === 0 ?
                <div
                  key={i}
                  className={`solar__tile solar__tile${isCalcOn && displayColor === color ? `--active` : ``}`}
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
      </div>
      <div
        className={`number-btns`}
      >
        {CALC_BTNS.map((btn, i) => {
          return (
            <button
              key={i}
              className={`number-btn ${CALC_BTNS[i]}`}
              id={CALC_BTNS[i]}
              onClick={
                (evt) => {
                  buttonPress(evt);
                  clearFocus(evt);
                }
              }
              disabled={setDisabled(ValuesMap[CALC_BTNS[i]])}
            >{ValuesMap[CALC_BTNS[i]]}
            </button>
          );
        })}
      </div>
    </>
  );
};

Buttons.propTypes = {
  buttonPress: PropTypes.func.isRequired,
  changeDisplayColor: PropTypes.func.isRequired,
  clearFocus: PropTypes.func.isRequired,
  displayColor: PropTypes.string.isRequired,
  isCalcOn: PropTypes.bool.isRequired,
};
export default Buttons;
