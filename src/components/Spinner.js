import React from 'react';
import spinner from '../spinner.svg';

const Spinner = () => {
  return (
    <div className="spinner-container">
      <img src={spinner} alt="Loading..." className="spinner" />
    </div>
  )
}

export default Spinner