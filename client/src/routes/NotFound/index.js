import React, { Component } from 'react';
import style from './style.css'

export default class NotFound extends Component {
  render() {
    const { ...props } = this.props;
    return (
      <div>
        <h1>
          404 <small>Not Found :(</small>
        </h1>
      </div>
    );
  }
}
