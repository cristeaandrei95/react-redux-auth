import React, { Component } from 'react';
import style from './style.css';
import { Link } from 'react-router-dom';

export default class Auth extends Component {
 render() {
  const {...props } = this.props;
  return (
   <div className={style.loginUi}>
    {this.props.children}
   </div>
  );
 }
}

