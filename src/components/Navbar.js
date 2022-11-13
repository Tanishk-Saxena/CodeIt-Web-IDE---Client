import React from 'react';
import Select from 'react-select';
import logo from '../code.svg';

const languages = [
  {label: "C++", value: "cpp"},
  {label: "Java", value: "java"},
  {label: "Python", value: "py"},
  {label: "Javascript", value: "js"}
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
        <Select isSearchable={true} className="select-dropdown" options={languages} placeholder="Choose your language..." onChange={(e)=>{setLanguage(e.value)}}/>
      </div>
    </div>
  )
}

export default Navbar