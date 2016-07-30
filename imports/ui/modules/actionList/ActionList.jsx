import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';

// import { Chans } from '../../api/channels.js';
// import Channel from '../channel/Channel.jsx';
import './ActionList.css';

export default class ActionList extends Component {

  handleClick(newMode, event) {
    event.preventDefault();

    this.props.changeInputMode(newMode);
  }

  render() {
    return (
      <div className="view-container has-tabs">
        <div className="action-list">
          <a onClick={this.handleClick.bind(this, 'newChannel')}>Créer un channel</a>
          <a onClick={this.handleClick.bind(this, 'newPoll')}>2</a>
          <a onClick={this.handleClick.bind(this, 'newMission')}>3</a>
        </div>
      </div>
    );
  }
}
