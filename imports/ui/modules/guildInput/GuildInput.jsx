import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { Link } from 'react-router';
import { browserHistory } from 'react-router';
import TimerMixin from 'react-timer-mixin';
import Loader from '../modules/loader/Loader.jsx'

import './GuildInput.css';

export default React.createClass({
  mixins: [TimerMixin],
  getInitialState () {
    return {name: ''};
  },
  handleUsernameChange (e) {
    this.setState({name: e.target.value});
  },
  handleSubmit (e) {
    e.preventDefault();
    const guild = {
      name: this.state.name,
    }
    Meteor.call('newGuild', guild, (err, res) => {
      if(err) {
        console.log(err);
      }
      if (res) {
        console.log(res);
      }
    }
  },

  render () {
    return (
      <div className="login-wrapp">
          <form id="box" className="loginForm" onSubmit={this.handleSubmit}>
            <div className="inner">

                <input
                  type="text"
                  placeholder="Nom de la guilde"
                  value={this.state.name}
                  onChange={this.handleNameChange}
                />

              <input type="submit" value="Creer une guilde" />
            </div>

          </form>
        </div>
    );
  }

});
