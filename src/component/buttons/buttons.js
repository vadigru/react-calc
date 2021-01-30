import PropTypes from 'prop-types';
import React from 'react';

import './buttons.scss';

const CALC_BTNS = [
  `clear`,
  `delete`,
  `square`,
  `minusplus`,
  `seven`,
  `eight`,
  `nine`,
  `plus`,
  `four`,
  `five`,
  `six`,
  `minus`,
  `one`,
  `two`,
  `three`,
  `multiply`,
  `zero`,
  `dot`,
  `equal`,
  `divide`,
];

const ValuesMap = {
  'clear': `C`,
  'delete': `⇦`,
  'square': `√`,
  'minusplus': `-/+`,
  'zero': 0,
  'one': 1,
  'two': 2,
  'three': 3,
  'four': 4,
  'five': 5,
  'six': 6,
  'seven': 7,
  'eight': 8,
  'nine': 9,
  'plus': `+`,
  'minus': `-`,
  'multiply': `×`,
  'dot': `·`,
  'equal': `=`,
  'divide': `÷`
};

const Buttons = (props) => {
  const {
    isCalcOn,
    getNumbers,
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
          onClick={() => getNumbers(`on/off`)}
        >
          {isCalcOn ? `ON` : `OFF`}
        </button>
        <div className="onoff-solar_title" >
          <div></div>
          <div></div>
          <div></div>
          <div></div>
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
              onClick={() => getNumbers(ValuesMap[CALC_BTNS[i]])}
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
  isCalcOn: PropTypes.bool,
  getNumbers: PropTypes.func,
};
export default Buttons;
