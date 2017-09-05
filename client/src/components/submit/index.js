import React, { Component } from 'react';
import style from './style.css';

export const Submit = (props) => {
 switch(props.color){
  case 'gray': return <button className={style.gray} onClick={props.onClick} type="button">{props.content}</button> 
  case 'red': return <button className={style.red} onClick={props.onClick} type="button">{props.content}</button>
  default : return <button className={style.white} onClick={props.onClick} type="button">{props.content}</button>
 }
}
