import React, { Component, PropTypes } from 'react';
import { Meteor }                      from 'meteor/meteor';
import $                                  from 'jquery';


export default class ConversationInput extends Component {

  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.textareaHeightTweak = this.textareaHeightTweak.bind(this);
    this.keyboardEvent = this.keyboardEvent.bind(this)
  }

  componentDidMount() {
    this.setState({
      barHeight: { height: this.refs.bar.scrollHeight + 10 }
    });
    setTimeout( () => {
       console.log(1234);
      $(".chat-sub-container").scrollTop(1000000);
    }, 150);
  }

  keyboardEvent(e) {
    if (e.keyCode === 13) {
      this.handleSubmit(e)
    }
  }

  handleSubmit(e) {

    e.preventDefault();

    const text = this.refs.textInput.value.trim();

    if (text !== '') {
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
        })
      });
    }
  }

  textareaHeightTweak(e) {
    this.setState({
      barHeight: { height: this.refs.textInput.scrollHeight + 10 },
      formHeight: { height: this.refs.textInput.scrollHeight }
    })
  }

  render() {
    return (
      <div ref="bar" className="chat-input-wrapper">
        <div className="chat-input">
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
      </div>
    );
  }
}
