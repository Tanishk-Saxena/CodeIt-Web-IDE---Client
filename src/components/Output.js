import React from 'react';
import Spinner from './Spinner';

const Output = ({output, loading}) => {
  // const { decodedOutput, decodedError, decodedCompileOutput, exit_code, time, memory } = output;
  const decodedOutput = "Hello World";
  const decodedError = null;
  const decodedCompileOutput = null;
  const exit_code = 0;
  const time = '0.008';
  const memory = 124;
  return (
    <div className="output">
        <div className="heading">
            Output
        </div>
        <div className="output-container">
          {loading && <Spinner />}
          {loading===false && 
            <div className="output-field">
              <div className="run-output">
                {decodedOutput && <div className="item decodedOutput">{decodedOutput}</div>}
                {decodedError && <div className="item decodedError">{decodedError}</div>}
                {decodedCompileOutput && <div className="item decodedCompileOutput">{decodedCompileOutput}</div>}
              </div>
              <div className="details">
                {exit_code!==null && <div className="item exitCode">Exit code: {exit_code}</div>}
                {time && <div className="item time">Time: {time}</div>}
                {memory!==null && <div className="item memory">Memory: {memory}</div>}
              </div>
            </div>
          }
        </div>
    </div>
  )
}

export default Output