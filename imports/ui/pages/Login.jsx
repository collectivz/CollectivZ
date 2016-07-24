import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';
import { Meteor } from 'meteor/meteor';
import { browserHistory } from 'react-router';
// browserHistory.push('/some/path')

import './Login.css';

export default React.createClass({
  //
  // renderResponse() {
  //   return (
  //     <div key={channel._id} channel={channel}></div>
  //   )
  // }

  // handleSubmit(event) {
  //   event.preventDefault();
  //
  //   const username = ReactDOM.findDOMNode(this.refs.loginUsername).value.trim();
  //   const pwd = ReactDOM.findDOMNode(this.refs.loginPwd).value.trim();
  //
  //   console.log(username);
  //   Meteor.loginWithPassword(user, pwd, function(){
  //     ReactDOM.findDOMNode(this.refs.loginUsername).value = '';
  //     ReactDOM.findDOMNode(this.refs.loginPwd).value = '';
  //   });
  //   // Clear form
  // }

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
    var username = this.state.username.trim();
    var pwd = this.state.pwd.trim();
    if (!pwd || !username) {
      return;
    }
    Meteor.loginWithPassword(username, pwd);

    this.setState({username: '', text: ''});
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
