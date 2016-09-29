import $                                  from 'jquery';
import React, { Component, PropTypes }    from 'react';
import { Meteor }                         from 'meteor/meteor';

import ActionPicker                       from './ActionPicker.jsx';
import { Toast }         from '../../helpers/Toast';


export default class MessageInput extends Component {

  constructor(props) {
    super(props);

    this.state = {
      showActions: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleAction = this.toggleAction.bind(this);
    this.textareaHeightTweak = this.textareaHeightTweak.bind(this);
    this.keyboardEvent = this.keyboardEvent.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidMount() {
    this.setState({
      barHeight: { height: this.refs.bar.scrollHeight + 10 }
    });
  }

  keyboardEvent(e) {
    if (e.keyCode === 13) {
      this.handleSubmit(e)
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    const { inputMode, hasActionPicker, channel, user } = this.props;
    const text = this.refs.textInput.value.trim();

    if (text.length) {
      if (inputMode === 'message' || hasActionPicker === false) {
        let message = {
          text,
          channelId: channel._id,
        };

        if (channel.type === 'group' && !_.contains(user.subscribedChannels, channel._id)) {
          Meteor.call('channels.join', channel._id);
        }
        Meteor.call('messages.insert', message, (err, res) => {
          if(err) {
            Toast(err.reason, "danger");
          }
          this.refs.textInput.value = '';
          this.setState({
            barHeight: { height: 46 },
            formHeight: { height: 36 }
          });

        });
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

  textareaHeightTweak(e) {
    this.setState({
      barHeight: { height: this.refs.textInput.scrollHeight + 10 },
      formHeight: { height: this.refs.textInput.scrollHeight }
    });
  }

  render() {
    const { hasActionPicker, channel } = this.props;

    if ($(".chat-input-wrapper").hasClass('disabled'))
    {
      $(".chat-input-wrapper").toggleClass("open");
      $(".chat-sub-container").toggleClass("open");
    }

    return (
      <div ref="bar" className="chat-input-wrapper">
        <div className="chat-input">
          {
            hasActionPicker ?
              <button onClick={this.toggleAction} className="chat-input-button-left button">
                <i className="icon icon-plus-circle"></i>
              </button>
            : ''
          }
          <form className="chat-input-form">
            <textarea
              onKeyUp={this.keyboardEvent}
              onChange={this.textareaHeightTweak}
              name="name"
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
