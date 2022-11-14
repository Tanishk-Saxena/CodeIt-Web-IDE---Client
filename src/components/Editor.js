import React from 'react'
import axios from 'axios';
import { Buffer } from 'buffer';

const Editor = ({language, code, inputs, setCode, setOutput, setLoading}) => {
  
  const handleRun = () => {
    setLoading(true);
    let bufferObj1 = Buffer.from(code, 'utf-8');
    let bufferObj2 = Buffer.from(inputs, 'utf-8');
    const data = {
      language_id: language,
      source_code: bufferObj1.toString('base64'),
      stdin: bufferObj2.toString('base64')
    }
    const jsonData = JSON.stringify(data);
    console.log(jsonData);
    axios.post(
      "http://localhost:8080/run",
      {jsonData}
    ).then((res)=>{
      const { stdout, stderr, compile_output, exit_code, time, memory } = res.data;
      let decodedOutput="", decodedError="", decodedCompileOutput=""
      if(stdout){
        let bufferObj3 = Buffer.from(stdout, 'base64');
        decodedOutput = bufferObj3.toString('utf-8');
      }
      if(stderr){
        let bufferObj4 = Buffer.from(stderr, 'base64');
        decodedError = bufferObj4.toString('utf-8');
      }
      if(compile_output){
        let bufferObj5 = Buffer.from(compile_output, 'base64');
        decodedCompileOutput = bufferObj5.toString('utf-8');
      }
      let outputObject = {
        decodedOutput,
        decodedError,
        decodedCompileOutput,
        exit_code,
        time,
        memory
      };
      console.log(outputObject);
      setOutput(outputObject)
    }).catch((err)=>{
      console.log(err);
    })
    setLoading(false);
  }

  const handleClear = () => {
    setCode("");
    setOutput("");
  }

  return (
    <div className="editor">
        <div className="banner">
          <div className="heading">
            Editor
          </div>
          <div className="buttons">
            <button className="run-btn" disabled={code==="" || language===""} onClick={handleRun}>Run</button>
            <button className="clear-btn" disabled={code===""} onClick={handleClear}>Clear</button>
          </div>
        </div>
        <div className="editor-container" id="editor-container">
          <textarea name="code" className="editor-field" value={code} onChange={(e)=>{setCode(e.target.value)}}></textarea>
        </div>
    </div>
  )
}

export default Editor