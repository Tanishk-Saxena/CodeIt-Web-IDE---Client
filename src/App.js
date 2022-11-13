import { useState } from 'react';
import Editor from "./components/Editor";
import Input from "./components/Input";
import Navbar from "./components/Navbar";
import Output from "./components/Output";

function App() {

  const [language, setLanguage] = useState("");
  const [inputs, setInputs] = useState("");
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <div className="App">
      <Navbar setLanguage={setLanguage}/>
      <div className="container">
        <Editor language={language} code={code} setCode={setCode} setOutput={setOutput} inputs={inputs} setLoading={setLoading}/>
        <Input inputs={inputs} setInputs={setInputs}/>
        <Output output={output} loading={loading}/>
      </div>
    </div>
  );
}

export default App;
