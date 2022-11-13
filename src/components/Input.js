import React from 'react'

const Input = ({inputs, setInputs}) => {
  return (
    <div className="input">
        <div className="heading">
            Input
        </div>
        <div className="input-container">
            <textarea className="input-field" name="input" id="input" value={inputs} onChange={(e)=>{setInputs(e.target.value)}}></textarea>
        </div>
    </div>
  )
}

export default Input