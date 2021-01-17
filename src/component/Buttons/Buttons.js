import React from 'react';
import './Buttons.scss';

const CALC_BTNS = [
  'onoff',
  'clear',
  'delete',
  'square',
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
  'onoff': 'on/off',
  'clear': 'C',
  'delete': '⇦',
  'square': '√',
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
    <div      
      className={'number-btns'}
    >
      {CALC_BTNS.map((btn, i) => {
        return(
          <button
            key={i}
            className={'number-btn'}
            id={CALC_BTNS[i]}
            onClick={() => getNumbers(ValuesMap[CALC_BTNS[i]])}
            disabled={setDisabled(ValuesMap[CALC_BTNS[i]])}
            >{ValuesMap[CALC_BTNS[i]]}
          </button>
        );
      })}
    </div>
  );
};

export default Buttons;
