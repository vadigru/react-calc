import React, {useState} from 'react';
import Display from '../display/Display';
import Buttons from '../Buttons/Buttons';

import './Calculator.scss';

let valueArray = [];
let displayArray = [];

const Calculator = () => {
  const [onOff, setOnOff] = useState({isCalcOn: false});
  const [display, setShowOnDisplay] = useState({showOnDisplay: ''});
  const [numbers, setNumbersArr] = useState({numbersArr: []});
  const [decimal, setDecimal] = useState({dot: false});

  const toggleOnOff = () => {
      if (!onOff.isCalcOn) {
        valueArray = [];
        displayArray = [];
        setOnOff({isCalcOn: true});
        setShowOnDisplay({showOnDisplay: '0'});
        setNumbersArr({numbersArr: valueArray});
        setDecimal({dot: false});
      } else {
        valueArray = [];
        displayArray = [];
        setOnOff({isCalcOn: false})
        setShowOnDisplay({showOnDisplay: ''})
        setNumbersArr({numbersArr: valueArray});
        setDecimal({dot: false});
      }
  }

  const clearDisplay = () => {
    valueArray = [];
    displayArray = [];
    setShowOnDisplay({showOnDisplay: '0'});
    setNumbersArr({numbersArr: valueArray});
    setDecimal({dot: false});
  }

  const deleteLastValue = () => {
    if (displayArray.length > 0) {
      const popped = valueArray.pop();
      displayArray.pop();
      setShowOnDisplay({showOnDisplay: displayArray.join('')});
      setNumbersArr({numbersArr: valueArray});
      if (popped === '.') {
        setDecimal({dot: false});
      }
    }
    if (displayArray.length === 0) {
      valueArray = [];
      displayArray = [];
      setShowOnDisplay({showOnDisplay: '0'});
      setNumbersArr({numbersArr: valueArray});
    }
  }

  const handleResult = (res) => {
    const resArr = res.toString().split('');
    valueArray = [];
    displayArray = [];
    resArr.slice(0, 11).forEach((item) => {
      if (typeof parseInt(item) === 'number' && !isNaN(item)) {
        valueArray.push(parseInt(item));
        displayArray.push(parseInt(item));
      } else {
        valueArray.push(item);
        displayArray.push(item);
      }
    })

    const resToDisplay = displayArray.join('');
    setShowOnDisplay({showOnDisplay: resToDisplay});
    setNumbersArr({numbersArr: valueArray});
  }
  
  const getSquare = () => {
    const num = eval(numbers.numbersArr.join(''));
    if (num <= 0) {
      return;
    }
    const res = Math.sqrt(num);
    handleResult(res);
  }

  const changeSign = () => {
    if (numbers.numbersArr.length === 0 || numbers.numbersArr[0] === 0) {
      return;
    }
    if (typeof numbers.numbersArr[0] === 'number' || numbers.numbersArr[0] === '0.') {
      valueArray.unshift('-');
      displayArray.unshift('-');
    } else {
      valueArray.shift();
      displayArray.shift();
    }
    setShowOnDisplay({showOnDisplay: displayArray.join('')});
    setNumbersArr({numbersArr: valueArray});
  }

  const calculate = () => {
    let res = eval(numbers.numbersArr.join(''));
    if (res === 0.30000000000000004) {
      res = 0.3;
    }
    handleResult(res);
    if (displayArray.includes('.')) {
      setDecimal({dot: true});
    } else {
      setDecimal({dot: false});
    }
  }

  const getResult = () => {
    if (typeof valueArray[valueArray.length - 1] !== 'number') {
      return;
    } 
    return calculate();
  }

  const handlePressedButtons = (targetContent) => {
    if (valueArray.length === 1 && valueArray[0] === 0) {
      valueArray = [];
      displayArray = [];
      setShowOnDisplay({showOnDisplay: '0'})
    }

    if ((targetContent === '+'
      || targetContent === '-'
      || targetContent === '*'
      || targetContent === '/')) {
      if ((numbers.numbersArr.length === 0
        || typeof valueArray[valueArray.length - 1] === 'string')
        &&
        (targetContent === '+'
        || targetContent === '-'
        || targetContent === '*'
        || targetContent === '/')) {
        return;
      }
      if (targetContent === '-'
        && typeof valueArray[valueArray.length - 1] === 'string') {
        return;
      }
      displayArray = [];
      if ((targetContent === '+'
        || targetContent === '-'
        || targetContent === '*'
        || targetContent === '/')
        && decimal.dot === true) {
        setDecimal({dot: false})
      }
      setShowOnDisplay({showOnDisplay: targetContent})
    }

    if (targetContent === '.') {
      if (decimal.dot === true) {
        return;
      }
      if (displayArray.length === 0 || (displayArray.length === 1
        && displayArray[displayArray.length - 1] === 0)) {
        targetContent = '0.'
      }
      setDecimal({dot: true});
    }

    if (displayArray.length <= 11) {
      valueArray.push(targetContent);
      console.log('valueArray ', valueArray);
      console.log('displayArray ', displayArray);
      displayArray.push(targetContent);
    }
  
    if (displayArray[displayArray.length - 1] !== '.'
      && displayArray[displayArray.length - 1] !== '0.'
      && typeof displayArray[displayArray.length - 1] !== 'number' ) {
      displayArray = [];
    }

    setShowOnDisplay({showOnDisplay: displayArray.join('') || targetContent});
    setNumbersArr({numbersArr: valueArray});
  }

  const getNumbers = (value) => {
    const targetContent = value;

    switch (true) {
      case targetContent === 'on/off':
        toggleOnOff();
        break;
      case targetContent === 'C':
        clearDisplay();
        break;
      case targetContent === '⇦':
        deleteLastValue();
        break;
      case targetContent === '√':
        getSquare();
        break;
      case targetContent === '-/+':
        changeSign();
        break;
      case targetContent === '=':
        getResult();
        break;
      default:
        handlePressedButtons(targetContent);
        break;
    }
  }

  return(
    <div className={'calculator'}>
      <Display 
        showOnDisplay={display.showOnDisplay}
        isCalcOn={onOff.isCalcOn}
      />
      <Buttons 
        getNumbers={getNumbers}
        isCalcOn={onOff.isCalcOn}
      />
    </div>
  )
};

export default Calculator;
