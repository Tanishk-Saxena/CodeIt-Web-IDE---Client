import React from 'react';
import axios from 'axios';
import { Buffer } from 'buffer';
import AceEditor from "react-ace";
import ReactTooltip from "react-tooltip";
import clear from '../clear.png';
import run from '../run.png';
import copy from '../copy.png';

import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/ext-language_tools";

const api = process.env.REACT_APP_API_SERVER;

const Editor = ({language, code, inputs, output, loading, setCode, setOutput, setLoading}) => {
  
  const handleRun = () => {
    setOutput("");
    setLoading(true);
    let bufferObj1 = Buffer.from(code, 'utf-8');
    let bufferObj2 = Buffer.from(inputs, 'utf-8');
    const data = {
      language: language.label,
      language_id: language.value,
      source_code: bufferObj1.toString('base64'),
      stdin: bufferObj2.toString('base64')
    }
    const jsonData = JSON.stringify(data);
    axios.post(
      api,
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
    setLoading(false);
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
  }

  return (
    <div className="editor">
        <div className="banner">
          <div className="heading">
            Editor
          </div>
          <div className="buttons">
            <button data-tip='run' className="run-btn" disabled={code==="" || language===null} onClick={handleRun}>
              <img src={run} alt="Run" />
            </button>
            <button data-tip data-for="copy" className="copy-btn" disabled={code===""} onClick={handleCopy}>
              <img src={copy} alt="Copy" />
            </button>
            <button data-tip='clear' className="clear-btn" disabled={code==="" && output==="" && loading===false} onClick={handleClear}>
              <img src={clear} alt="Clear" />
            </button>
            <ReactTooltip effect='solid' place='bottom'/>
            <ReactTooltip id="copy" aria-haspopup="true" place="bottom" effect="solid" event="click" eventOff="mouseleave">
              Copied
            </ReactTooltip>
            <ReactTooltip id="copy" aria-haspopup="true" place="bottom" effect="solid" event="mouseenter" eventOff="mouseleave click">
              Copy
            </ReactTooltip>
          </div>
        </div>
        <div className="editor-container" id="editor-container">
          <AceEditor
            placeholder="Type your code here"
            mode={language?(language.label==='c++'?'c_cpp':language.label): ""}
            theme="monokai"
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
              enableBasicAutocompletion: true,
              enableLiveAutocompletion: true,
              enableSnippets: true,
              showLineNumbers: true,
              tabSize: 2,
            }}
          />
        </div>
    </div>
  )
}

export default Editor