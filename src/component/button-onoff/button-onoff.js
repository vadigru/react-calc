import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import Context from '../../context.js';

import './button-onoff.scss';

const ButtonOnOff = () => {
  const {
    processPressedButton,
    clearFocus,
    onOff,
  } = useContext(Context);
  return (
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
  );
};

ButtonOnOff.propTypes = {
  context: PropTypes.shape({
    processPressedButton: PropTypes.func.isRequired,
    clearFocus: PropTypes.func.isRequired,
    onOff: PropTypes.bool.isRequired,
  })
};

export default ButtonOnOff;
