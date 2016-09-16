import $                                  from 'jquery';
import React, { Component, PropTypes }    from 'react';
import { Meteor }                         from 'meteor/meteor';

import ActionPicker                       from './ActionPicker.jsx';


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
  }

  componentDidUpdate() {
    const { inputMode, hasActionPicker } = this.props;
    const { showActions } = this.state;

    if (!showActions && inputMode != 'message' && hasActionPicker === true) {
      this.props.changeInputMode('message');
    }
  }

  componentDidMount() {
    this.setState({
      barHeight: { height: this.refs.bar.scrollHeight + 10 }
    });
    setTimeout( () => {
      $(".chat-sub-container").scrollTop(1000000);
    }, 150 );
  }

  keyboardEvent(e) {
    if (e.keyCode === 13) {
      this.handleSubmit(e)
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    const { inputMode, hasActionPicker } = this.props;
    const text = this.refs.textInput.value.trim();

    if (inputMode === 'message' || hasActionPicker === false) {
      let message = {
        text,
        channelId: this.props.channelId,
      };

      Meteor.call('messages.insert', message, (err, res) => {
        if(err) {
          console.log(err);
        }
        this.refs.textInput.value = '';
        this.setState({
          barHeight: { height: 46 },
          formHeight: { height: 36 }
        });

        $(".chat-sub-container").stop().animate({
          scrollTop: 10000
        }, 500);

      });
    } else {
      this.props.answerToZorro(text);
      this.refs.textInput.value = '';
      $(".chat-sub-container").stop().animate({
        scrollTop: 10000
      }, 500);
    }
  }

  toggleAction() {
    this.setState({
      showActions: !this.state.showActions
    });
    $(".chat-input-wrapper").toggleClass("open");
    $(".chat-sub-container").toggleClass("open");
    $(".icon-plus-circle").toggleClass("icon-rotate-45");
  }

  getCss() {
    if (this.state.showActions)
      return "bar-stable bar bar-footer item-input-inset has-actions-list";
    else {
      return "bar-stable bar bar-footer item-input-inset";
    }
  }

  textareaHeightTweak(e) {
    this.setState({
      barHeight: { height: this.refs.textInput.scrollHeight + 10 },
      formHeight: { height: this.refs.textInput.scrollHeight }
    });
  }

  render() {
    const { hasActionPicker } = this.props;

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
            <i className="icon icon-paperplane"></i>
          </button>
        </div>
        {
          hasActionPicker ?
            <ActionPicker changeInputMode={this.props.changeInputMode}/>
          : ''
        }
      </div>
    );
  }

}
