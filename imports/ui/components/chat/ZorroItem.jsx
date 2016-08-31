import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';

import './ZorroItem.css';

export default class ZorroItem extends Component {

  constructor(props) {
    super(props);

    this.isMine = this.isMine.bind(this);
    this.userAvatar = this.userAvatar.bind(this);
    this.getName = this.getName.bind(this);
  }

  isMine () {
    if (this.props.message.author === 'self') {
      return 'message message-mine';
    } else {
      return 'message message-other';
    }
  }

  userAvatar() {
    if (this.props.message.author === 'self') {
      const user = Meteor.user();
      return user.profile.avatar;
    } else {
      return '/img/zorro.jpg'
    }
  }

  getName() {
    if (this.props.message.author === 'self') {
      const user = Meteor.user();
      return user.username;
    } else {
      return 'Zorro';
    }
  }

  render() {
    const {
      message,
      answerToZorro,
      choices
    } = this.props;

    return (
      <div className="message-wrapper">
        <div className={this.isMine()}>
          <div className="message-header">
            <span className="message-user">{this.getName()}</span>
          </div>
          <div className="text">
            {message.text}
          </div>
          {message.author === 'Zorro' ?
            <div>
            {choices.map((choice, index) => {
              return (<button onClick={answerToZorro.bind(this, choice)} key={index}>{choice}</button>);
            })}
            </div>
            : ''
          }
          <span className="picture">
            <img src={this.userAvatar(message.author)} alt="" />
          </span>
        </div>
      </div>
    );
  }
}

ZorroItem.propTypes = {
  message: PropTypes.object.isRequired,
}
