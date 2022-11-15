import React from 'react';
import Select from 'react-select';
import logo from '../code.svg';

const languages = [
  {label: "c++", value: 54},
  {label: "java", value: 62},
  {label: "python", value: 71},
  {label: "javascript", value: 63}
]

const Navbar = ({setLanguage}) => {
  return (
    <div className="navbar">
      <div className="brand">
        <div className="logo">
          <img src={logo} alt="logo" />
        </div>
        <div className="name">
          CodeIt!
        </div>
      </div>
      <div className="select-container">
        <Select isSearchable={true} className="select-dropdown" options={languages} placeholder="Choose your language..." onChange={(e)=>{setLanguage(e)}}/>
      </div>
    </div>
  )
}

export default Navbar