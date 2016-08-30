import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';

import ActionList from './ActionList.jsx';

import './MessageInput.css';

export default class MessageInput extends Component {

  constructor(props) {
    super(props);

    this.state = {
      showActions: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleAction = this.toggleAction.bind(this);
    this.textareaHeightTweak = this.textareaHeightTweak.bind(this);
    this.keyboardEvent = this.keyboardEvent.bind(this)
  }

  componentDidUpdate() {
    if (!this.state.showActions && this.props.inputMode != 'message') {
      this.props.changeInputMode('message');
    }
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

    if (this.props.inputMode === 'message') {
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
    } else {
      this.props.answerToZorro(text);
      this.refs.textInput.value = '';
    }
  }

  toggleAction() {
    this.setState({
      showActions: !this.state.showActions
    });
    this.props.toggleMarginBottom();
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
    })
  }

  render() {
    return (
      <div ref="bar">
        <div className={this.getCss()} style={this.state.barHeight} >
          <button type="button" name="button" onClick={this.toggleAction}>
            <i className="fa fa-plus-circle" aria-hidden="true"></i>
          </button>
          <label className="item-input-wrapper">
            <form className="new-msg" onSubmit={this.handleSubmit} style={this.state.formHeight}>
              <textarea onKeyUp={this.keyboardEvent} onChange={this.textareaHeightTweak} className="message-input" name="name" ref="textInput" ></textarea>
            </form>
          </label>
          <button type="button" name="button" onClick={this.handleSubmit}>
            <i className="fa fa-paper-plane" aria-hidden="true"></i>
          </button>
        </div>
        {this.state.showActions
          ? <ActionList changeInputMode={this.props.changeInputMode}/>
          : ''}
      </div>
    );
  }
}
