import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Link } from 'react-router';

import './Login.css';

export default class Login extends Component {

  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const username = this.refs.username.value;
    const password = this.refs.password.value;

    if (username && password) {
      Meteor.loginWithPassword(username, password);
    }
  }

  render() {
    return (
      <div className="login-wrapp">
        <form id="box" className="loginForm" onSubmit={this.handleSubmit}>
          <div className="inner">
            <img className="avatar" src="/img/zorro.jpg" />
              <input
                type="text"
                placeholder="Username"
                ref="username"
              />
              <input
                type="password"
                placeholder="Password"
                ref="password"
              />
            <input type="submit" value="Login" />
          </div>
          <Link to="/register">Register</Link>
        </form>
      </div>
    );
  }
}
