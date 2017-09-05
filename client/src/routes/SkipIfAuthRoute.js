import React, { Component } from 'react'
import { Redirect, Route } from 'react-router-dom'
import { connect } from 'react-redux'

class SkipIfAuthRoute extends Component {
 render() {
    const { component: Component, ...rest } = this.props
    return (
      <Route {...rest} render={props => {
       if( this.props.token == null){
        return <Component {...this.props} /> 
       }
       return <Redirect to="/" />
      }} />
    )
   }
}

const mapStateToProps = (state) => {
  return {
    token: state.auth.token
  };
};

export default connect(mapStateToProps)(SkipIfAuthRoute);
