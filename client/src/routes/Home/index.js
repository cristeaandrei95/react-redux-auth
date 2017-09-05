import React, { Component } from 'react'
import style from './style.css'
import { withRouter } from 'react-router-dom'

import { connect } from 'react-redux'
import { logout} from '../../actions/auth'
import Messages from '../Messages'

import { Submit } from '../../components/submit'

class Home extends Component {
  logout(e) {
  e.preventDefault();
  this.props.dispatch(logout());
  this.props.history.push('/login'); 
 }
 render() {
 const auth = this.props.auth
  return (
   <div className={style.wrapper}>
    <h1>User email: {auth.user.email}</h1> 
    <h2>id: {auth.user._id}</h2> 
    <h3>JSON web token: {auth.token}</h3> 
    <Submit color={'red'} onClick={this.logout.bind(this)} content="Logout"/> 
   </div>
  );
 }
}

const mapStateToProps = (state) => {
  return {
    messages: state.messages,
    auth: state.auth
  };
};

export default withRouter(connect(mapStateToProps)(Home));
