import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';

import './MessageItem.css';

export default class MessageItem extends Component {

  constructor(props) {
    super(props);

    this.state = {
      editing: false
    };

    this.isMine = this.isMine.bind(this);
    this.editMessage = this.editMessage.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
    this.deleteMessage = this.deleteMessage.bind(this);
  }

  editMessage() {
    const {
      message
    } = this.props;
    const newText = this.refs.textInput.value;

    Meteor.call('messages.edit', newText, message._id);
    this.setState({
      editing: false
    });
  }

  toggleEdit() {
    this.setState({
      editing: !this.state.editing
    });
  }

  deleteMessage() {
    Meteor.call('messages.delete', this.props.message._id);
  }

  isMine () {
    const {
      message
    } = this.props;

    if (Meteor.userId() === message.author) {
      return 'message message-mine';
    } else {
      return 'message message-other';
    }
  }

  userAvatar(userId) {
    let user;
    if (userId === Meteor.userId) {
      user = Meteor.user();
    } else {
      user = Meteor.users.findOne(userId);
    }
    if (user && user.profile && user.profile.avatar)
      return user.profile.avatar;
    else {
      return '/img/no-user.png'
    }

  }

  render() {
    const {
      message,
      user,
    } = this.props;

    const {
      editing
    } = this.state;

    return (
      <div className="message-wrapper">
        <div className={this.isMine()}>
          <div className="message-header">
            <span className="message-user">
              { message.type
                ? 'Zorro'
                : message.authorName }
            </span>
          </div>
          <div className="text">
            {editing ?
              <div>
                <form className="new-msg" onSubmit={this.editMessage} >
                  <input type="text" name="name" ref="textInput" defaultValue={message.text} />
                </form>
                <button type="button" name="button" onClick={this.editMessage}>
                  <i className="fa fa-paper-plane" aria-hidden="true"></i>
                </button>
              </div>
              : <p>{message.text}</p>
            }
          </div>
          { (message.author === Meteor.userId()) ?
              <div>
                <i className="fa fa-pencil" aria-hidden="true" onClick={this.toggleEdit}></i>
                <i className="fa fa-trash" aria-hidden="true" onClick={this.deleteMessage}></i>
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

MessageItem.propTypes = {
  message: PropTypes.object.isRequired,
}
