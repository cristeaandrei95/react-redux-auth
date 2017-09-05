import React, { Component } from 'react';
import style from './style.css';
import { Link } from 'react-router-dom';

export const InputPass = (props) => {
 switch(props.link) {
  case 'yes': 
   return (
    <div className={style.inputLogin}>
     <div className={style.inputWrapper}>
      <input placeholder="password" type="password" name="password" className={style.inputText} value={props.value} onChange={props.handleChange}/>
      <div className={style.passIcon} ></div>
     </div>
     <div className={style.inputWrapper}>
      <Link to="/forgot/password" className={style.inputLink}>Forgot your password?</Link>
     </div>
    </div>
   );
   break;
  default:
   return (
    <div className={style.inputLogin}>
     <div className={style.inputWrapper}>
      <input placeholder="password" type="password" name="password" className={style.inputText} value={props.value} onChange={props.handleChange}/>

      <div className={style.passIcon} ></div>
     </div>
    </div>
   );

 }
}

