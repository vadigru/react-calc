import React from 'react';
import './Buttons.scss';

const CALC_BTNS = [
  // 'onoff',
  'clear',
  'delete',
  'square',
  'minusplus',
  'seven',
  'eight',
  'nine',
  'plus',
  'four',
  'five',
  'six',
  'minus',
  'one',
  'two',
  'three',
  'multiply',
  'zero',
  'dot',
  'equal',
  'divide',
];

const ValuesMap = {
  // 'onoff': 'on/off',
  'clear': 'C',
  'delete': '⇦',
  'square': '√',
  'minusplus': '-/+',
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
  'plus': '+',
  'minus': '-',
  'multiply': '*',
  'dot': '.',
  'equal': '=',
  'divide': '/'
}

const Buttons = (props) => {
  const {getNumbers, isCalcOn} = props;

  const setDisabled = (val) => {
    if (val === 'on/off') {
      return false;
    } else {
      return !isCalcOn;
    }
  }

  return(
    <>
      <div className="onoff-solar">
        <button
          className="number-btn onoff"
          id="onoff"
          onClick={() => getNumbers('on/off')}
        >
          on/off
        </button>
        <div className="onoff-solar_title" >
          {/* CALCULATOR */}
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
      <div
        className={'number-btns'}
      >
        {CALC_BTNS.map((btn, i) => {
          return(
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

export default Buttons;
