import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';

import './ActionPicker.css';

export default class ActionPicker extends Component {

  handleClick(newMode, event) {
    event.preventDefault();

    this.props.changeInputMode(newMode);
  }

  render() {
    return (
      <div className="has-tabs">
        <div className="action-list">
          <a onClick={this.handleClick.bind(this, 'newPoll')}>
            <i className="fa fa-pie-chart" aria-hidden="true"></i>
            <span>PollZ</span>
          </a>
          <a onClick={this.handleClick.bind(this, 'newChannel')}>
            <i className="fa fa-cogs" aria-hidden="true"></i>
            <span>ActionZ</span>
          </a>
          <a onClick={this.handleClick.bind(this, 'newBuddie')}>
            <i className="fa fa-user-plus" aria-hidden="true"></i>
            <span>BuddieZ</span>
          </a>
          <a onClick={this.handleClick.bind(this, 'newBeer')}>
            <i className="fa fa-calendar" aria-hidden="true"></i>
            <span>BeerZ</span>
          </a>
          <a onClick={this.handleClick.bind(this, 'newFeedback')}>
            <i className="fa fa-star-o" aria-hidden="true"></i>
            <span>FeedbackZ</span>
          </a>
          <a onClick={this.handleClick.bind(this, 'newCoin')}>
            <i className="fa fa-eur" aria-hidden="true"></i>
            <span>CoinZ</span>
          </a>
        </div>
      </div>
    );
  }
}
