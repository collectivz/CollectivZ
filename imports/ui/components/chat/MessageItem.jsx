import React, { Component, PropTypes }    from 'react';
import { Meteor }                         from 'meteor/meteor';

import { Moment }                         from 'moment';


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

  editMessage(e) {
    e.preventDefault()
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
      return 'chat-bubble chat-bubble-mine';
    } else {
      return 'chat-bubble chat-bubble-other';
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
    const { message, user } = this.props;

    const { editing } = this.state;

    console.log(Moment);
    
    let time = "";

    //let time = Moment(message.createdAt).fromNow();

    return (
      <div className={this.isMine()} >

          <img src={this.userAvatar(message.author)} />

          <div className="bubble-content">

              <div className="bubble-content-header">

                <span className="name">
                    {
                      message.type ?
                        'Zorro'
                      :
                        message.authorName
                    }
                </span>

                <span className="date">{time}</span>
                
                {
                  (message.author === Meteor.userId()) ?
                    <div className="bubble-content-admin">
                      <i className="icon icon-pencil" onClick={this.toggleEdit}></i>
                      <i className="icon icon-trash" onClick={this.deleteMessage}></i>
                    </div>
                  :
                    ''
                }

              </div>
              
              {
                editing ?
                  <div>
                    <form className="merged" >
                      <input className="small" type="text" name="name" ref="textInput" defaultValue={message.text} />
                      <button className="small primary button" type="button" name="button" onClick={this.editMessage}>
                        <i className="icon icon-pencil" aria-hidden="true"></i>
                      </button>
                    </form>
                  </div>
                :
                  <p>{message.text}</p>
              }

          </div>

      </div>
    );
  }
}

MessageItem.propTypes = {
  message: PropTypes.object.isRequired,
}
