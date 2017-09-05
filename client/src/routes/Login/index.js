import React, { Component } from 'react'
import style from './style.css'
import { withRouter } from 'react-router-dom'

import { connect } from 'react-redux'
import { login } from '../../actions/auth'
import Messages from '../Messages'

import Auth from '../../components/auth'
import { InputEmail } from '../../components/inputEmail'
import { InputPass } from '../../components/inputPass'
import { Submit } from '../../components/submit'

class Login extends Component {
 constructor(props) {
  super(props);
  this.state = {
   email: '',
   password: ''
  };
 }
  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });

  }
  handleLogin(e) {
    e.preventDefault();
    this.props.dispatch(login(this.state.email, this.state.password));
    this.props.history.push('/'); 
  }
 render() {
  return (
   <div className={style.frame}>
   <div className={style.frameInner}>
      <Messages messages={this.props.messages}/>
    <Auth>
     <InputEmail value={this.state.email} handleChange={this.handleChange.bind(this)}/> 
     <InputPass link="no" value={this.state.password} handleChange={this.handleChange.bind(this)}/> 
     <Submit color={'red'} onClick={this.handleLogin.bind(this)} content="Login"/> 
    </Auth>
    </div>
   </div>
  );
 }
}

const mapStateToProps = (state) => {
  return {
    messages: state.messages
  };
};

export default withRouter(connect(mapStateToProps)(Login));
