import React from 'react';
import Spinner from './Spinner';

const Output = ({output, loading}) => {
  return (
    <div className="output">
        <div className="heading">
            Output
        </div>
        <div className="output-container">
          <div className="output-field">
            {loading && <Spinner />}
            {output}
          </div>
        </div>
    </div>
  )
}

export default Output