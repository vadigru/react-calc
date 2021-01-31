import React, {useState} from 'react';
import Display from '../display/display';
import Buttons from '../buttons/buttons';

import './calculator.scss';

const Calculator = () => {
  const initFontSize = window.innerWidth < 400 ? 40 : 55;

  const [decimal, setDecimal] = useState(false);
  const [display, setDisplay] = useState(`0`);
  const [displayArray, setDisplayArray] = useState([]);
  const [error, setError] = useState(false);
  const [onOff, setOnOff] = useState(false);
  const [result, setResult] = useState(false);
  const [scale, setScale] = useState(initFontSize);
  const [sqrtResult, setSqrtResult] = useState(false);
  const [total, setTotal] = useState(`--`);
  const [valueArray, setValueArray] = useState([]);

  const lastValue = valueArray[valueArray.length - 1];
  const beforeValue = valueArray.length - displayArray.length;

  const clearArrays = (...args) => {
    args.forEach((arr) => {
      arr.length = 0;
    });
  };

  const toggleOnOff = () => {
    if (!onOff) {
      setOnOff(true);
      setDisplay(`0`);
      setValueArray([]);
      setDisplayArray([]);
      setDecimal(false);
      setError(false);
      setScale(initFontSize);
      setResult(false);
      setSqrtResult(false);
      setTotal(`--`);
    } else {
      setOnOff(false);
      setDisplay(`0`);
      setValueArray([]);
      setDisplayArray([]);
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

  const deleteLastValue = () => {
    if (displayArray.length > 0) {
      const popped = valueArray.pop();
      displayArray.pop();
      setDisplay(displayArray.join(``));
      if (popped === `.`) {
        setDecimal(false);
      }
    }
    if (displayArray.length === 0) {
      setDisplay(lastValue);
    }
    if (displayArray.length < 12) {
      setScale(initFontSize);
    }
    setError(false);
    setResult(false);
    setSqrtResult(false);
  };

  // result calculation start -------------------------------------------------
  const handleResult = (res, btnValue) => {
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
    setTotal(btnValue === `=` || btnValue === `√` ? `--` : valueArray.join(``));
  };

  const calculate = (btnValue) => {
    let res = eval(valueArray.join(``)); // eslint-disable-line no-eval
    if (res === 0.30000000000000004) {
      res = 0.3;
    }
    handleResult(res, btnValue);
  };

  const getResult = (btnValue) => {
    if (typeof lastValue !== `number` && lastValue !== `)`) {
      setError(true);
      return;
    }
    if (btnValue === `=`) {
      setResult(true);
    }
    calculate(btnValue);
  };
  // result calulation end ----------------------------------------------------

  const getSquare = (btnValue) => {
    if (typeof lastValue === `string` && lastValue !== `.`) {
      setError(true);
      return;
    }

    const num = eval(valueArray.join(``)); // eslint-disable-line no-eval

    if (num <= 0 || valueArray.length === 0) {
      setError(true);
      return;
    }
    const res = Math.sqrt(num);
    handleResult(res, btnValue);
    if (result === true) {
      setResult(false);
    }
    setError(false);
    setSqrtResult(true);
  };

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
        valueArray.splice(beforeValue, 0, `(-`);
        valueArray.splice(valueArray.length, 0, `)`);
        displayArray.unshift(`-`);
      } else {
        valueArray.splice(beforeValue, 0, `-`);
        displayArray.unshift(`-`);
      }
    } else {
      if (typeof lastValue !== `number` &&
                 lastValue !== `.` &&
                 lastValue !== `)`) {
        return;
      }
      valueArray.splice(beforeValue, 1);
      displayArray.shift();
    }
    setError(false);
    setDisplay(displayArray.join(``));
  };

  const handlePressedButtons = (btnValue) => {
    if (btnValue === `·`) {
      btnValue = `.`;
    }

    if ((btnValue === `+` ||
         btnValue === `-` ||
         btnValue === `×` ||
         btnValue === `/`)) {
      if ((valueArray.length === 0 ||
    typeof lastValue === `string` &&
           lastValue !== `)` &&
           lastValue !== `.`) &&
          (btnValue === `+` ||
           btnValue === `-` ||
           btnValue === `×` ||
           btnValue === `/`)) {
        return;
      }
      if ((btnValue === `+` ||
           btnValue === `-` ||
           btnValue === `×` ||
           btnValue === `/`)) {
        getResult();
        setScale(initFontSize);
        setDecimal(false);
      }
    }

    if (display === `0` && btnValue === 0) {
      return;
    }

    if (btnValue === `.`) {
      if (decimal === true) {
        setError(true);
        return;
      }
      setDecimal(true);
      if (displayArray.length === 0 ||
         (displayArray.length === 1 && display === `0`)) {
        btnValue = `0.`;
      }
    }

    btnValue = btnValue === `×` ? btnValue = `*` : btnValue = btnValue;
    btnValue = btnValue === `÷` ? btnValue = `/` : btnValue = btnValue;
    valueArray.push(btnValue);
    btnValue = btnValue === `*` ? btnValue = `×` : btnValue = btnValue;
    btnValue = btnValue === `/` ? btnValue = `÷` : btnValue = btnValue;
    displayArray.push(btnValue);

    const lastDisplayValue = displayArray[displayArray.length - 1];

    if (typeof lastDisplayValue !== `number` &&
               lastDisplayValue !== `.` &&
               lastDisplayValue !== `0.` &&
               btnValue !== `-/+`) {
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
    setDisplay(displayArray.join(``) || btnValue);
  };

  const getNumbers = (value) => {
    const btnValue = value;

    switch (true) {
      case btnValue === `on/off`:
        toggleOnOff();
        break;
      case btnValue === `C`:
        clearDisplay();
        break;
      case btnValue === `⇦`:
        deleteLastValue();
        break;
      case btnValue === `√`:
        getSquare(`√`);
        break;
      case btnValue === `-/+`:
        changeSign();
        break;
      case btnValue === `=`:
        getResult(`=`);
        break;
      default:
        handlePressedButtons(btnValue);
        break;
    }
  };

  return (
    <div className={`calculator`}>
      <Display
        isCalcOn={onOff}
        isResult={result}
        isSqrtResult={sqrtResult}
        isError={error}
        scale={scale}
        showOnDisplay={display}
        total={total}
      />
      <Buttons
        getNumbers={getNumbers}
        isCalcOn={onOff}
      />
      <div className="calculator_label">
        <span className="calculator_model">BK201</span>
      </div>
    </div>
  );
};

export default Calculator;
