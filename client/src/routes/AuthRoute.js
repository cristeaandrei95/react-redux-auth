import React, { Component } from 'react'
import { Redirect, Route } from 'react-router-dom'
import { connect } from 'react-redux'

class AuthRoute extends Component {
 render() {
  const { component: Component, ...rest } = this.props
   return (
    <Route {...rest} render={props => {
     if( this.props.token == null){
      return <Redirect to="/login" />
     } 
      return <Component {...this.props} />
   }} />
  )
 }
}

const mapStateToProps = (state) => {
  return {
    token: state.auth.token
  };
};

export default connect(mapStateToProps)(AuthRoute);
