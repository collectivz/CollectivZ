import $                                  from 'jquery';
import React, { Component, PropTypes }    from 'react';
import { Router }                         from 'react-router';
import { Meteor }                         from 'meteor/meteor';
import ReactEmoji                         from 'react-emoji';

import ActionPicker                       from './ActionPicker.jsx';
import { Toast }                          from '../../helpers/Toast';


export default class MessageInput extends Component {

  constructor(props) {
    super(props);

    this.state = {
      showActions: false,
      isTyping: false,
      isTypingMessage: '',
      isTypingVisible: false,
      typerCount: 0
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleAction = this.toggleAction.bind(this);
    this.textareaHeightTweak = this.textareaHeightTweak.bind(this);
    this.keyboardEvent = this.keyboardEvent.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.toggleTyping = this.toggleTyping.bind(this);
    this.getWhoIsTyping = this.getWhoIsTyping.bind(this);
  }

  componentDidMount() {
    const {
      channel
    } = this.props;
    this.setState({
      barHeight: { height: this.refs.bar.scrollHeight + 10 }
    });
    if (channel) {
      this.getWhoIsTyping();
    }
  }

  componentDidUpdate() {
    const {
      channel
    } = this.props;
    const {
      typerCount
    } = this.state;
    if (channel && typerCount !== channel.isTyping.length) {
      this.getWhoIsTyping();
      this.setState({
        typerCount: channel.isTyping.length
      });
    }
  }

  componentWillUnmount() {
    const {
      channel
    } = this.props;

    Meteor.call('channels.stopTyping', channel._id);
  }

  keyboardEvent(e) {
    if (e.charCode == 13) {
      e.preventDefault();
      this.handleSubmit(e);
    }
  }

  toggleTyping(e) {
    e.preventDefault();
    const {
      channel
    } = this.props;
    const {
      isTyping
    } = this.state;

    if (!isTyping) {
      Meteor.call('channels.startTyping', channel._id);
      this.setState({
        isTyping: true
      });
    } else if (!this.refs.textInput.value) {
      Meteor.call('channels.stopTyping', channel._id);
      this.setState({
        isTyping: false
      });
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    const {
      inputMode,
      hasActionPicker,
      channel,
      user,
      answeringTo,
      changeInputMode
    } = this.props;
    const text = this.refs.textInput.value.trim();

    if (text.length) {
      if (inputMode === 'message' || hasActionPicker === false) {
        let message = {
          text,
          channelId: channel._id,
        };
        Meteor.call('channels.stopTyping', channel._id);
        this.setState({
          isTyping: false
        });
        if (channel.type === 'group' && !_.contains(user.subscribedChannels, channel._id)) {
          Meteor.call('channels.join', channel._id);
        }
        Meteor.call('messages.insert', message, (err, res) => {
          if(err) {
            Toast(err.reason, "danger");
          }
        });
        this.refs.textInput.value = '';
        this.setState({
          barHeight: { height: 46 },
          formHeight: { height: 36 }
        });
      } else if (inputMode === 'answer') {
        Meteor.call('channels.stopTyping', channel._id);
        this.setState({
          isTyping: false
        });
        if (channel.type === 'group' && !_.contains(user.subscribedChannels, channel._id)) {
          Meteor.call('channels.join', channel._id);
        }
        Meteor.call('messages.answerMessage', answeringTo, text, (err, res) => {
          if(err) {
            Toast(err.reason, "danger");
          }
          this.refs.textInput.value = '';
          this.setState({
            barHeight: { height: 46 },
            formHeight: { height: 36 }
          });
        });
        changeInputMode('message');
      } else {
        this.props.answerToZorro(text);
        this.refs.textInput.value = '';
      }
    }
  }

  handleInputChange(inputMode) {
    this.toggleAction();

    this.props.changeInputMode(inputMode);
  }

  toggleAction() {
    const { inputMode, hasActionPicker } = this.props;
    const { showActions } = this.state;

    if (!showActions && inputMode !== 'message' && hasActionPicker === true) {
      this.props.changeInputMode('message');
    }
    this.setState({
      showActions: !showActions
    });
    $(".chat-input-wrapper").toggleClass("open");
    $(".chat-sub-container").toggleClass("open");
    $(".icon-plus-circle").toggleClass("icon-rotate-45");
  }

  getWhoIsTyping() {
    const {
      channel
    } = this.props;
    if (channel && channel.isTyping && !channel.isTyping.length) {
      this.setState({
        isTypingVisible: false
      });
      return;
    }
    const users = Meteor.users.find({ _id: { $in: channel.isTyping } }).fetch();
    const index = users.findIndex(user => {
      if (user._id === Meteor.userId()) {
        return true;
      }
      return false;
    });
    if (index >= 0) {
      users.splice(index, 1);
    }
    let result = '';
    if (!users.length) {
      this.setState({
        isTypingVisible: false
      });
      return;
    } else if (users.length === 1) {
      result = `${users[0].username} est en train d'écrire`;
    } else if (users.length === 2) {
      result = `${users[0].username} et ${users[1].username} sont en train d'écrire`;
    } else if (users.length > 2) {
      result = "Plusieurs personnes sont en train d'écrire";
    }

    this.setState({
      isTypingVisible: true,
      isTypingMessage: result
    });
  }

  textareaHeightTweak(e) {
    this.setState({
      barHeight: { height: this.refs.textInput.scrollHeight + 10 },
      formHeight: { height: this.refs.textInput.scrollHeight }
    });
  }

  render() {
    const { hasActionPicker, channel } = this.props;
    const {
      isTypingVisible,
      isTypingMessage
    } = this.state;
    const showWhoIsTyping = isTypingVisible
      ? 'someone-is-typing visible'
      : 'someone-is-typing';
    if ($(".chat-input-wrapper").hasClass('disabled'))
    {
      $(".chat-input-wrapper").toggleClass("open");
      $(".chat-sub-container").toggleClass("open");
    }

    return (
      <div ref="bar" className="chat-input-wrapper">
        <div className={showWhoIsTyping}>
          <div className="ball-pulse">
            <div></div>
            <div></div>
            <div></div>
          </div>
          <div className="someone-is-typing-names">{isTypingMessage}</div>
        </div>
        <div className="chat-input">
          {
            hasActionPicker ?
              <button onClick={this.toggleAction} className="chat-input-button-left button">
                <i className="icon icon-plus-circle"></i>
              </button>
            : ''
          }
          <form className="chat-input-form" onChange={this.toggleTyping}>
            <textarea
              onKeyPress={this.keyboardEvent}
              onChange={this.textareaHeightTweak}
              name="name"
              placeholder="Discuter..."
              className="chat-input-textarea"
              ref="textInput">
            </textarea>
          </form>
          <button onClick={this.handleSubmit} className="chat-input-button-right button">
            <i className="icon icon-envelope"></i>
          </button>
        </div>
        {
          hasActionPicker ?
            <ActionPicker changeInputMode={this.handleInputChange}/>
          : ''
        }
      </div>
    );
  }

}

window.onbeforeunload = () => {
  const channels = Channels.find().fetch();

  channels.forEach(channel => {
    Meteor.call('channels.stopTyping', channel._id);
  });
}
