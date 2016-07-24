import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';
import { Meteor } from 'meteor/meteor';
import { browserHistory } from 'react-router';
import TimerMixin from 'react-timer-mixin';

// browserHistory.push('/some/path')
import Loader from '../modules/loader/Loader.jsx'


import './Login.css';

export default React.createClass({
  mixins: [TimerMixin],
  getInitialState () {
    return {username: '', pwd: ''};
  },
  handleUsernameChange (e) {
    this.setState({username: e.target.value});
  },
  handlePwdChange(e) {
    this.setState({pwd: e.target.value});
  },
  handleSubmit (e) {
    e.preventDefault();
    const that = this;
    var username = this.state.username.trim();
    var pwd = this.state.pwd.trim();
    if (pwd && username) {
      this.props.temper(username, pwd);
    }
    // this.history.pushState(null, '/chans');
  },

  render () {
    return (
      <div className="login-wrapp">
          <form id="box" className="loginForm" onSubmit={this.handleSubmit}>
            <div className="inner">
              <img className="avatar" src="/img/zorro.jpg" />

                <input
                  type="text"
                  placeholder="Username"
                  value={this.state.username}
                  onChange={this.handleUsernameChange}
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={this.state.pwd}
                  onChange={this.handlePwdChange}
                />
              <input type="submit" value="Login" />
            </div>

          </form>
        </div>
    );
  }

});
