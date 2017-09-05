import React, { Component } from 'react';
import style from './style.css';
import { Link } from 'react-router-dom';

export const InputEmail = (props) => {
 return (
  <div className={style.inputLogin}>
   <div className={style.inputWrapper}>
    <input placeholder="e-mail" name="email" className={style.inputText} value={props.value} onChange={props.handleChange}/>
    <div className={style.emailIcon} ></div>
   </div>
  </div>
 );
}

