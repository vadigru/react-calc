import React, {useEffect, useState} from 'react';
import Context from '../../context.js';
import Display from '../display/display';
import Buttons from '../buttons/buttons';
import {ValuesMap} from '../../const.js';

import './calculator.scss';

const Calculator = () => {
  const initFontSize = window.innerWidth < 400 ? 40 : 55;

  const [decimal, setDecimal] = useState(false);
  const [display, setDisplay] = useState(`0`);
  const [displayArray, setDisplayArray] = useState([]);
  const [displayColor, setDisplayColor] = useState(`lightgrey`);
  const [error, setError] = useState(false);
  const [onOff, setOnOff] = useState(false);
  const [result, setResult] = useState(false);
  const [scale, setScale] = useState(initFontSize);
  const [sqrtResult, setSqrtResult] = useState(false);
  const [total, setTotal] = useState(`--`);
  const [valueArray, setValueArray] = useState([]);
  const [open, setOpen] = useState(false);
  const lastValue = valueArray[valueArray.length - 1];
  const beforeLastValue = valueArray.length - displayArray.length;

  useEffect(() => {
    window.addEventListener(`keydown`, processPressedButton);
    return () => {
      window.removeEventListener(`keydown`, processPressedButton);
    };
  });

  const clearFocus = (evt) => {
    evt.target.blur();
  };

  const clearArrays = (...args) => {
    args.forEach((arr) => {
      arr.length = 0;
    });
  };

  const changeDisplayColor = (evt) => {
    setOnOff(true);
    setDisplayColor(window.getComputedStyle(evt.target, null).getPropertyValue(`background-color`));
  };

  const toggleDescription = () => {
    if (!open) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  };
  const toggleOnOff = () => {
    if (!onOff) {
      setOnOff(true);
      setDisplay(`0`);
      setDisplayArray([]);
      setValueArray([]);
      setDisplayColor(displayColor === `lightgrey` ? `rgb(144, 238, 144)` : displayColor);
      setDecimal(false);
      setError(false);
      setScale(initFontSize);
      setResult(false);
      setSqrtResult(false);
      setTotal(`--`);
    } else {
      setOnOff(false);
      setDisplay(`0`);
      setDisplayArray([]);
      setDisplayColor(`lightgrey`);
      setValueArray([]);
      setDecimal(false);
      setError(false);
      setScale(initFontSize);
      setResult(false);
      setSqrtResult(false);
      setTotal(`--`);
    }
  };

  const clearDisplay = () => {
    setDisplay(`0`);
    setValueArray([]);
    setDisplayArray([]);
    setDecimal(false);
    setError(false);
    setScale(initFontSize);
    setResult(false);
    setSqrtResult(false);
    setTotal(`--`);
  };

  const removeLastSymbol = () => {
    if (displayArray.length > 0) {
      const popped = valueArray.pop();
      displayArray.pop();
      setDisplay(displayArray.join(``));
      if (popped === `.`) {
        setDecimal(false);
      }
    }
    if (displayArray.length === 0) {
      if (typeof lastValue === `string`) {
        valueArray.pop();
      }
      setDisplay(``);
    }
    if (displayArray.length < 12) {
      setScale(initFontSize);
    }
    setError(false);
    setResult(false);
    setSqrtResult(false);
  };

  // handle final result ------------------------------------------------------
  const handleResult = (res, value) => {
    if (res === 0.30000000000000004) {
      res = 0.3;
    }
    if (!Number.isInteger(res)) {
      res = Math.round(res * 1000000) / 1000000;
    }

    const resArr = res.toString().split(``);
    clearArrays(valueArray, displayArray);
    resArr.forEach((item) => {
      if (typeof parseInt(item, 10) === `number` && !isNaN(item)) {
        valueArray.push(parseInt(item, 10));
        displayArray.push(parseInt(item, 10));
      } else {
        valueArray.push(item);
        displayArray.push(item);
      }
    });
    if (displayArray.length > 11) {
      setScale(35);
    } else {
      setScale(initFontSize);
    }
    if (displayArray.includes(`.`)) {
      setDecimal(true);
    } else {
      setDecimal(false);
    }

    if (displayArray.join(``) === `0`) {
      setValueArray([]);
      setDisplayArray([]);
      setDisplay(``);
    }
    setDisplay(displayArray.join(``));
    setTotal(value === `=` || value === `√` ? `--` : valueArray.join(``));
    if (sqrtResult) {
      setSqrtResult(false);
    }
    setError(false);
  };

  // get result from inputed values ---------------------------------------------
  const calculate = () => {
    return eval(valueArray.join(``)); // eslint-disable-line no-eval
  };

  const getResult = (value) => {
    if (typeof lastValue !== `number` && lastValue !== `)`) {
      // setError(true);
      return;
    }
    if (value === `=`) {
      setResult(true);
    }
    const res = calculate(value);
    handleResult(res, value);
  };

  // find square root ------------------------------------------------
  const getSquare = (value) => {
    if (typeof lastValue === `string` && lastValue !== `.`) {
      setError(true);
      return;
    }
    const calculatedValue = calculate(value);
    if (calculatedValue <= 0 || valueArray.length === 0) {
      setError(true);
      return;
    }
    const res = Math.sqrt(calculatedValue);
    handleResult(res, value);
    if (result) {
      setResult(false);
    }
    setError(false);
    setSqrtResult(true);
  };

  // change positive/negative number ------------------------------------------
  const changeSign = () => {
    if (valueArray.length === 0 || valueArray[0] === 0) {
      setError(true);
      return;
    }
    if ((typeof lastValue === `number` ||
                valueArray[0] === `0.` ||
                lastValue === `.`) &&
                (displayArray[0] !== `-`)) {
      if (typeof valueArray[valueArray.length - (displayArray.length + 1)] === `string`) {
        valueArray.splice(beforeLastValue, 0, `(-`);
        valueArray.splice(valueArray.length, 0, `)`);
        displayArray.unshift(`-`);
      } else {
        valueArray.splice(beforeLastValue, 0, `-`);
        displayArray.unshift(`-`);
      }
    } else {
      if (typeof lastValue !== `number` &&
                 lastValue !== `.` &&
                 lastValue !== `)`) {
        return;
      }
      valueArray.splice(beforeLastValue, 1);
      displayArray.shift();
    }
    setError(false);
    setDisplay(displayArray.join(``));
  };

  // handling of pressed button ----------------------------------------
  const processPassedValue = (value) => {
    if (value === `·`) {
      value = `.`;
    }
    if ((value === `+` ||
         value === `-` ||
         value === `×` ||
         value === `÷`)) {
      if ((valueArray.length === 0 ||
     typeof lastValue === `string` &&
                 lastValue !== `)` &&
                lastValue !== `.`) &&
                    (value === `+` ||
                     value === `-` ||
                     value === `×` ||
                     value === `÷`)) {
        return;
      }
      if ((value === `+` ||
           value === `-` ||
           value === `×` ||
           value === `÷`)) {
        getResult();
        setScale(initFontSize);
        setDecimal(false);
      }
    }

    if (displayArray.length === 0 && value === 0 && typeof lastValue !== `string`) {
      return;
    }

    if (value === `.`) {
      if (decimal === true) {
        setError(true);
        return;
      }
      setDecimal(true);
      if (displayArray.length === 0) {
        value = `0.`;
      }
    }

    value = value === `×` ? value = `*` : value = value;
    value = value === `÷` ? value = `/` : value = value;
    valueArray.push(value);
    value = value === `*` ? value = `×` : value = value;
    value = value === `/` ? value = `÷` : value = value;
    displayArray.push(value);

    const lastDispalyValue = displayArray[displayArray.length - 1];

    if (typeof lastDispalyValue !== `number` &&
               lastDispalyValue !== `.` &&
               lastDispalyValue !== `0.` &&
               value !== `-/+`) {
      clearArrays(displayArray);
    }

    if (displayArray.length > 11) {
      setScale(35);
    }

    if (result === true ||
        sqrtResult === true ||
        error === true) {
      setResult(false);
      setSqrtResult(false);
      setError(false);
    }
    setDisplay(displayArray.join(``) || value);
  };

  const processValue = (value) => {
    switch (true) {
      case value === ValuesMap.onoff:
        toggleOnOff();
        break;
      case value === ValuesMap.clear:
        clearDisplay();
        break;
      case value === ValuesMap.delete:
        removeLastSymbol();
        break;
      case value === ValuesMap.square:
        getSquare(ValuesMap.square);
        break;
      case value === ValuesMap.minusplus:
        changeSign();
        break;
      case value === ValuesMap.equal:
        getResult(ValuesMap.equal);
        break;
      default:
        processPassedValue(value);
        break;
    }
  };

  const processPressedButton = (evt) => {
    let value = ``;
    if (evt.target.id === `onoff` || evt.code === `Space`) {
      value = ValuesMap.onoff;
      evt.preventDefault();
      processValue(value);
    }
    if (!onOff) {
      return;
    }
    switch (true) {
      case evt.target.id === `zero` || evt.key === `0`:
        value = ValuesMap.zero;
        break;
      case evt.target.id === `one` || evt.key === `1`:
        value = ValuesMap.one;
        break;
      case evt.target.id === `two` || evt.key === `2`:
        value = ValuesMap.two;
        break;
      case evt.target.id === `three` || evt.key === `3`:
        value = ValuesMap.three;
        break;
      case evt.target.id === `four` || evt.key === `4`:
        value = ValuesMap.four;
        break;
      case evt.target.id === `five` || evt.key === `5`:
        value = ValuesMap.five;
        break;
      case evt.target.id === `six` || evt.key === `6`:
        value = ValuesMap.six;
        break;
      case evt.target.id === `seven` || evt.key === `7`:
        value = ValuesMap.seven;
        break;
      case evt.target.id === `eight` || evt.key === `8`:
        value = ValuesMap.eight;
        break;
      case evt.target.id === `nine` || evt.key === `9`:
        value = ValuesMap.nine;
        break;
      case evt.target.id === `plus` || evt.key === ValuesMap.plus:
        value = ValuesMap.plus;
        break;
      case evt.target.id === `minus` || evt.key === ValuesMap.minus:
        value = ValuesMap.minus;
        break;
      case evt.target.id === `multiply` || evt.key === `*`:
        value = ValuesMap.multiply;
        break;
      case evt.target.id === `divide` || evt.key === `/`:
        value = ValuesMap.divide;
        break;
      case evt.target.id === `equal` || evt.key === `Enter`:
        value = ValuesMap.equal;
        break;
      case evt.target.id === `minusplus` || evt.code === `KeyW`:
        value = ValuesMap.minusplus;
        break;
      case evt.target.id === `square` || evt.code === `KeyQ`:
        value = ValuesMap.square;
        break;
      case evt.target.id === `clear` || evt.code === `Escape`:
        value = ValuesMap.clear;
        break;
      case evt.target.id === `delete` || evt.code === `Backspace`:
        value = ValuesMap.delete;
        break;
      case evt.target.id === `dot` || evt.key === `.`:
        value = ValuesMap.dot;
        break;
      default:
        return;
    }
    processValue(value);
  };

  return (
    <Context.Provider value={{
      changeDisplayColor,
      clearFocus,
      display,
      displayColor,
      error,
      onOff,
      processPressedButton,
      result,
      sqrtResult,
      scale,
      total
    }}
    >
      <div className={`container`}>
        <div className={`calc`}>
          <Display />
          <Buttons />
          <div className={`info`}>
            <div className={`help-btn`} onClick={toggleDescription}>
              <span className={`help-btn__title`}>help</span>
            </div>
            <span className={`model`}><i>Electronica</i> VG-2021</span>
          </div>
        </div>

        <div className={`description  description${open ? `--open` : ``}`}>
          <ul className={`description__list`}>
            <li>You can use <kbd>Numeric Keys</kbd> or <kbd>Numeric Keypad</kbd></li>
            <li>On/Off - <kbd>Spacebar</kbd></li>
            <li>Clear display - <kbd>Escape</kbd></li>
            <li>Remove last symbol - <kbd>Backspace</kbd></li>
            <li>Find square root - <kbd>Q</kbd></li>
            <li>Chnage positive/negative sign - <kbd>W</kbd></li>
            <li>Get result of operation - <kbd>Enter</kbd></li>
          </ul>
          <div className={`description__bottom`}></div>
        </div>
      </div>
    </Context.Provider>
  );
};

export default Calculator;
