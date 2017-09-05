import React, { Component } from 'react';
import style from './style.css';
import { Link } from 'react-router-dom';

export const InputUser = (props) => {
   return (
    <div className={style.inputLogin}>
     <div className={style.inputWrapper}>
      <input placeholder="name & surname" name="name" className={style.inputText} value={props.value} onChange={props.handleChange}/>
      <div className={style.userIcon} ></div>
     </div>
    </div>
   );
}

