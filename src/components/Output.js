import React from 'react';
import Spinner from './Spinner';

const Output = ({output, loading}) => {
  const { decodedOutput, decodedError, decodedCompileOutput, exit_code, time, memory } = output;
  return (
    <div className="output">
        <div className="heading">
            Output
        </div>
        <div className="output-container">
          {loading && <Spinner />}
          {output && 
            <div className="output-field">
              <div className="run-output">
                {decodedOutput && <div className="item decodedOutput">{decodedOutput}</div>}
                {decodedError && <div className="item decodedError">{decodedError}</div>}
                {decodedCompileOutput && <div className="item decodedCompileOutput">{decodedCompileOutput}</div>}
              </div>
              <div className="details">
                {(exit_code===0) && <div className="item exitCode">Exit code: {exit_code}</div>}
                {time && <div className="item time">Time: {time}</div>}
                {(memory) && <div className="item memory">Memory: {memory}</div>}
              </div>
            </div>
          }
        </div>
    </div>
  )
}

export default Output