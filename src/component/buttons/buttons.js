import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import Context from '../../context.js';

import DisplayColors from '../display-colors/display-colors.js';
import {CALC_BTNS, ValuesMap} from '../../const.js';

import './buttons.scss';

const Buttons = () => {
  const {
    clearFocus,
    onOff,
    processPressedButton,
  } = useContext(Context);

  const setDisabled = (val) => {
    if (val === `on/off`) {
      return false;
    } else {
      return !onOff;
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
              processPressedButton(evt);
              clearFocus(evt);
            }
          }
        >
          {onOff ? `ON` : `OFF`}
        </button>
        <DisplayColors />
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
                  processPressedButton(evt);
                  clearFocus(evt);
                }
              }
              disabled={setDisabled(ValuesMap[CALC_BTNS[i]])}
            >
              {ValuesMap[CALC_BTNS[i]]}
            </button>
          );
        })}
      </div>
    </>
  );
};

Buttons.propTypes = {
  context: PropTypes.shape({
    processPressedButton: PropTypes.func.isRequired,
    clearFocus: PropTypes.func.isRequired,
    onOff: PropTypes.bool.isRequired,
  })
};
export default Buttons;
