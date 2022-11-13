import React from 'react'
import axios from 'axios';
import {EditorView, basicSetup} from "codemirror"
import {javascript} from "@codemirror/lang-javascript"

const Editor = ({language, code, inputs, setCode, setOutput, setLoading}) => {
  
  let view = new EditorView({
    extensions: [basicSetup, javascript()],
    parent: document.querySelector("#editor-field")
  });
  
  const handleRun = () => {
    setLoading(true);
    // use code + inputs + language and make a data object and pass it as body of a post api call
    // receive result and store it in the output variable using setOutput
    axios.post("http://localhost:8080/run").then((res)=>{setOutput(res.data)}).catch((err)=>{console.log(err);})
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
        <div className="editor-field" id="editor-field">

        </div>
    </div>
  )
}

export default Editor