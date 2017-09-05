import React, { Component } from 'react'
import { Redirect, Switch, Route, withRouter } from 'react-router-dom'

import Login from './Login'
import Home from './Home'
import Signup from './Signup'
import NotFound from './NotFound'

import AuthRoute from './AuthRoute'
import SkipIfAuthRoute from './SkipIfAuthRoute'

class App extends Component {
  render() {
    return (
      <div>
       <Switch> 
        <AuthRoute path="/" exact component={Home} /> 
        <SkipIfAuthRoute path="/login" component={Login}/> 
        <SkipIfAuthRoute path="/signup" component={Signup} /> 
        <Route path="/404" component={NotFound} /> 
        <Redirect to="/404" />
       </Switch>
      </div>
    );
  }
}

export default withRouter(App);
