import React from 'react';
import PropTypes from 'prop-types';
import './ValidationError.css';

function ValidationError(props) {
  if (props.message)
    return <p className='validation-error'>{props.message}</p>;
  return null;
}

ValidationError.defaultProps = {
  message: ''
}

ValidationError.propTypes = {
  message: PropTypes.string
}

export default ValidationError;