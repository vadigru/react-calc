import React, {useState} from 'react';
import Display from '../display/Display';
import Buttons from '../Buttons/Buttons';

import './Calculator.scss';

let valueArray = [];

const Calculator = () => {
  const [onOff, setOnOff] = useState({isCalcOn: false})
  const [values, setValues] = useState({
    showOnDisplay: '',
    numbersString: [],
    calculated: false
  })

  const toggleOnOff = () => {
      if (!onOff.isCalcOn) {
        valueArray = [];
        setOnOff({isCalcOn: true})
        setValues({
            showOnDisplay: '0',
            numbersString: valueArray
        })
      } else {
        valueArray = [];
        setOnOff({isCalcOn: false})
        setValues({
            showOnDisplay: '',
            numbersString: valueArray
          })
      }
  }

  const clearDisplay = () => {
    valueArray = [];
    setValues({
        showOnDisplay: '0',
        numbersString: valueArray
      })
  }

  const deleteLastValue = () => {
    if (valueArray.length > 0) {
      valueArray.pop();
      setValues({
        showOnDisplay: values.numbersString.join(''),
        numbersString: valueArray,
        calculated: false
      })
    }
    if (valueArray.length === 0) {
      setValues({
        showOnDisplay: '0',
        numbersString: []
      })
    }
  }

  const getSum = () => {
    const newValue = eval(values.numbersString.join(''));
    valueArray = [];
    valueArray.push(newValue);
    setValues({
      showOnDisplay: newValue,
      numbersString: valueArray,
      calculated: true
    })
  }

  const getResult = () => {
    if (typeof valueArray[valueArray.length - 1] !== 'number') {
      return;
    } 
    return getSum();
  }

  const handlePressedButtons = (targetContent) => {
    console.log(targetContent, typeof targetContent);
    if ((typeof valueArray[valueArray.length - 1] === 'string') && (typeof targetContent === 'string'))  {
      if (targetContent === '.') {
        targetContent = '0.'
      }
      return;
    } else if ((valueArray.length === 1 && values.calculated) && (typeof targetContent === 'number' || targetContent === '.')) {
      valueArray = [];
      if (targetContent === '.') {
        targetContent = '0.'
      }
    } else {
      if ((typeof valueArray[valueArray.length - 1] !== 'number') && targetContent === '.') {
        targetContent = '0.'
      }
    }
    valueArray.push(targetContent);
    setValues({
      showOnDisplay: values.numbersString.join('') || targetContent,
      numbersString: valueArray,
      calculated: false
    })
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
        showOnDisplay={values.showOnDisplay}
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
