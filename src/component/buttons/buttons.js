import PropTypes from 'prop-types';
import React from 'react';
import {CALC_BTNS, ValuesMap} from '../../const.js';

import './buttons.scss';


const Buttons = (props) => {
  const {
    buttonPress,
    changeDisplayColor,
    clearFocus,
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
        <div className="onoff-solar_title" >
          <div onClick={(evt) => changeDisplayColor(evt)}></div>
          <div onClick={(evt) => changeDisplayColor(evt)}></div>
          <div onClick={(evt) => changeDisplayColor(evt)}></div>
          <div onClick={(evt) => changeDisplayColor(evt)}></div>
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
  isCalcOn: PropTypes.bool.isRequired,
};
export default Buttons;
