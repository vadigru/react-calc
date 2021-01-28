import React, {useEffect, useState} from 'react';
import Display from '../display/display';
import Buttons from '../buttons/buttons';

import './calculator.scss';

const valueArray = [];
const displayArray = [];

const Calculator = () => {
  const [decimal, setDecimal] = useState({dot: false});
  const [display, setShowOnDisplay] = useState({showOnDisplay: `0`});
  const [onOff, setOnOff] = useState({isCalcOn: false});
  const [result, setResult] = useState({isResultOn: false});
  const [scale, setScale] = useState({fontSize: 50});
  const [sqrtResult, setSqrtResult] = useState({isSqrtResultOn: false});

  useEffect(() => {
    console.log(`%va`, valueArray, `%`, `&da`, displayArray, `&`);
  });

  const clearArrays = (...args) => {
    args.forEach((arr) => {
      arr.length = 0;
    });
  };

  const toggleOnOff = () => {
    if (!onOff.isCalcOn) {
      clearArrays(valueArray, displayArray);
      setOnOff({isCalcOn: true});
      setShowOnDisplay({showOnDisplay: `0`});
      setDecimal({dot: false});
      setScale({fontSize: 50});
      setResult({isResultOn: false});
      setSqrtResult({isSqrtResultOn: false});
    } else {
      clearArrays(valueArray, displayArray);
      setOnOff({isCalcOn: false});
      setShowOnDisplay({showOnDisplay: `0`});
      setDecimal({dot: false});
      setScale({fontSize: 50});
      setResult({isResultOn: false});
      setSqrtResult({isSqrtResultOn: false});
    }
  };

  const clearDisplay = () => {
    clearArrays(valueArray, displayArray);
    setShowOnDisplay({showOnDisplay: `0`});
    setDecimal({dot: false});
    setScale({fontSize: 50});
    setResult({isResultOn: false});
    setSqrtResult({isSqrtResultOn: false});
  };

  const deleteLastValue = () => {
    if (displayArray.length > 0) {
      const popped = valueArray.pop();
      displayArray.pop();
      setShowOnDisplay({showOnDisplay: displayArray.join(``)});
      if (popped === `.`) {
        setDecimal({dot: false});
      }
    }
    if (displayArray.length === 0) {
      clearArrays(valueArray, displayArray);
      setShowOnDisplay({showOnDisplay: `0`});
    }
    if (displayArray.length < 12) {
      setScale({
        fontSize: 50
      });
    }
    setResult({isResultOn: false});
    setSqrtResult({isSqrtResultOn: false});
  };

  const handleResult = (res) => {
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
      setScale({fontSize: 35});
    } else {
      setScale({fontSize: 50});
    }
    if (displayArray.includes(`.`)) {
      setDecimal({dot: true});
    } else {
      setDecimal({dot: false});
    }
    setShowOnDisplay({showOnDisplay: displayArray.join(``)});
  };

  const getSquare = () => {
    if (typeof valueArray[valueArray.length - 1] === `string`) {
      return;
    }
    const num = eval(valueArray.join(``));

    if (num <= 0 || valueArray.length === 0) {
      return;
    }
    const res = Math.sqrt(num);
    handleResult(res);
    if (result.isResultOn === true) {
      setResult({isResultOn: false});
    }
    setSqrtResult({isSqrtResultOn: true});
  };

  const changeSign = () => {
    if (valueArray.length === 0 || valueArray[0] === 0) {
      return;
    }
    if ((typeof valueArray[valueArray.length - 1] === `number` || valueArray[0] === `0.`) && (displayArray[0] !== `-`)) {
      if (typeof valueArray[valueArray.length - (displayArray.length + 1)] === `string`) {
        valueArray.splice(valueArray.length - displayArray.length, 0, `(-`);
        valueArray.splice(valueArray.length, 0, `)`);
        displayArray.unshift(`-`);
      } else {
        valueArray.splice(valueArray.length - displayArray.length, 0, `-`);
        displayArray.unshift(`-`);
      }
    } else {
      if (typeof valueArray[valueArray.length - 1] === `string`) {
        return;
      }
      valueArray.splice(valueArray.length - displayArray.length, 1);
      displayArray.shift();
    }
    setShowOnDisplay({showOnDisplay: displayArray.join(``)});
  };

  const calculate = () => {
    let res = eval(valueArray.join(``));
    if (res === 0.30000000000000004) {
      res = 0.3;
    }
    handleResult(res);
  };

  const getResult = (targetContent) => {
    if (typeof valueArray[valueArray.length - 1] !== `number` && valueArray[valueArray.length - 1] !== `)`) {
      return;
    }
    if (targetContent === `=`) {
      setResult({isResultOn: true});
    }
    calculate();

  };

  const handlePressedButtons = (targetContent) => {
    if ((targetContent === `+`
      || targetContent === `-`
      || targetContent === `*`
      || targetContent === `/`)) {
      if ((valueArray.length === 0
        || typeof valueArray[valueArray.length - 1] === `string`
        && valueArray[valueArray.length - 1] !== `)`)
        && (targetContent === `+`
        || targetContent === `-`
        || targetContent === `*`
        || targetContent === `/`)) {
        return;
      }
      if ((targetContent === `+`
          || targetContent === `-`
          || targetContent === `*`
          || targetContent === `/`)) {
        getResult();
        setScale({fontSize: 50});
        setDecimal({dot: false});
      }
    }

    if (targetContent === `.`) {
      if (decimal.dot === true) {
        return;
      }
      setDecimal({dot: true});
      if (displayArray.length === 0 || (displayArray.length === 1
        && displayArray[displayArray.length - 1] === 0)) {
        targetContent = `0.`;
      }
    }

    valueArray.push(targetContent);
    displayArray.push(targetContent);

    if (displayArray[displayArray.length - 1] !== `.`
      && displayArray[displayArray.length - 1] !== `0.`
      && typeof displayArray[displayArray.length - 1] !== `number`
      && targetContent !== `-/+`) {
      clearArrays(displayArray);
    }

    if (displayArray.length > 11) {
      setScale({
        fontSize: 35
      });
    }

    if (result.isResultOn === true || sqrtResult.isSqrtResultOn === true) {
      setResult({isResultOn: false});
      setSqrtResult({isSqrtResultOn: false});
    }
    setShowOnDisplay({showOnDisplay: displayArray.join(``) || targetContent});
  };

  const getNumbers = (value) => {
    const targetContent = value;

    switch (true) {
      case targetContent === `on/off`:
        toggleOnOff();
        break;
      case targetContent === `C`:
        clearDisplay();
        break;
      case targetContent === `⇦`:
        deleteLastValue();
        break;
      case targetContent === `√`:
        getSquare(`√`);
        break;
      case targetContent === `-/+`:
        changeSign();
        break;
      case targetContent === `=`:
        getResult(`=`);
        break;
      default:
        handlePressedButtons(targetContent);
        break;
    }
  };

  return (
    <div className={`calculator`}>
      <Display
        isCalcOn={onOff.isCalcOn}
        isResultOn={result.isResultOn}
        isSqrtResultOn={sqrtResult.isSqrtResultOn}
        scale={scale.fontSize}
        showOnDisplay={display.showOnDisplay}
      />
      <Buttons
        getNumbers={getNumbers}
        isCalcOn={onOff.isCalcOn}
      />
      <div className="calculator_label">
        <span className="calculator_model">BK201</span>
      </div>
    </div>
  );
};

export default Calculator;
