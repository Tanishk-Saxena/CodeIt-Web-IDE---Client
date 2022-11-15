import React from 'react';
import { render } from "react-dom";
import axios from 'axios';
import { Buffer } from 'buffer';
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/ext-language_tools";

const Editor = ({language, code, inputs, setCode, setOutput, setLoading}) => {
  
  const handleRun = () => {
    setLoading(true);
    let bufferObj1 = Buffer.from(code, 'utf-8');
    let bufferObj2 = Buffer.from(inputs, 'utf-8');
    const data = {
      language_id: language.value,
      source_code: bufferObj1.toString('base64'),
      stdin: bufferObj2.toString('base64')
    }
    const jsonData = JSON.stringify(data);
    axios.post(
      "http://localhost:8080/run",
      {jsonData}
    ).then((res)=>{
      const { stdout, stderr, compile_output, exit_code, time, memory } = res.data;
      let decodedOutput="", decodedError="", decodedCompileOutput="";
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
      setOutput(outputObject);
      setLoading(false);
    }).catch((err)=>{
      console.log(err);
    })
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
            <button className="run-btn" disabled={code==="" || language===null} onClick={handleRun}>Run</button>
            <button className="clear-btn" disabled={code===""} onClick={handleClear}>Clear</button>
          </div>
        </div>
        <div className="editor-container" id="editor-container">
          <AceEditor
            placeholder="Type your code here"
            mode={language?(language.label==='c++'?'c_cpp':language.label): ""}
            theme="github"
            name="code"
            className="editor-field"
            fontSize="1rem"
            onChange={(newValue)=>{setCode(newValue)}}
            showPrintMargin={true}
            height= "100%"
            width= "calc(100% - 6px)"
            showGutter={true}
            highlightActiveLine={true}
            value={code}
            setOptions={{
              enableBasicAutocompletion: false,
              enableLiveAutocompletion: false,
              enableSnippets: false,
              showLineNumbers: true,
              tabSize: 2,
            }}
          />
        </div>
    </div>
  )
}

export default Editor