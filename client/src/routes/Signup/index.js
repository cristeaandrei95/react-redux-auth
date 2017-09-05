import React, { Component } from 'react'
import style from './style.css'
import { withRouter } from 'react-router-dom'

import { connect } from 'react-redux'
import { signup } from '../../actions/auth'
import Messages from '../Messages'

import Auth from '../../components/auth'
import { InputUser } from '../../components/inputUser'
import { InputPass } from '../../components/inputPass'
import { InputEmail } from '../../components/inputEmail'
import { Submit } from '../../components/submit'

class Signup extends Component {
 constructor(props){
  super(props);
  this.state = {
   name: '',
   email: '',
   password: ''
  };
 }
 handleChange(e) {
  this.setState({ [e.target.name]: e.target.value });
 }
 handleSignup(e) {
  e.preventDefault();
  this.props.dispatch(signup(this.state.name, this.state.email, this.state.password));
  this.props.history.push('/'); 
 }
 render() {
  return (
   <div className={style.frame}>
   <div className={style.frameInner}>
    <Auth>
     <InputUser value={this.state.name} handleChange={this.handleChange.bind(this)}/> 
     <InputEmail value={this.state.email} handleChange={this.handleChange.bind(this)}/> 
     <InputPass link="no" value={this.state.password} handleChange={this.handleChange.bind(this)}/> 
     <Submit color={'red'} onClick={this.handleSignup.bind(this)} content="Sign Up"/> 
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

export default withRouter(connect(mapStateToProps)(Signup));
