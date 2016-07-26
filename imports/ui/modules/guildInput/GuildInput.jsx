import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import Loader from '../loader/Loader.jsx'

import './GuildInput.css';

export default React.createClass({
  getInitialState () {
    return {name: ''};
  },
  handleNameChange (e) {
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
    });
  },
  render () {
    return (
      <div className="view-container has-top-nav">
          <form onSubmit={this.handleSubmit}>
              <input
                type="text"
                placeholder="Nom de la guilde"
                onChange={this.handleNameChange}
              />

            <input type="submit" value="Creer une guilde" />
          </form>
        </div>
    );
  }

});
