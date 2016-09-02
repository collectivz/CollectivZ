import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';


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
    })
  }

  keyboardEvent(e) {
    if (e.keyCode === 13) {
      this.handleSubmit(e)
    }
  }

  handleSubmit(event) {
    event.preventDefault();
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

  getCss() {
    return "bar-stable bar bar-footer item-input-inset";
  }

  textareaHeightTweak(e) {
    this.setState({
      barHeight: { height: this.refs.textInput.scrollHeight + 10 },
      formHeight: { height: this.refs.textInput.scrollHeight }
    })
  }

  render() {
    return (
      <div ref="bar">
        <div className={this.getCss()}>
          <label className="item-input-wrapper">
            <form className="new-msg" onSubmit={this.handleSubmit}>
              <textarea onKeyUp={this.keyboardEvent} onChange={this.textareaHeightTweak} className="message-input" name="name" ref="textInput" ></textarea>
            </form>
          </label>
          <button type="button" name="button" onClick={this.handleSubmit}>
            <i className="fa fa-paper-plane" aria-hidden="true"></i>
          </button>
        </div>
      </div>
    );
  }
}
