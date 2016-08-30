import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';

import ActionPicker from './ActionPicker.jsx';

import './MessageInput.css';

export default class MessageInput extends Component {

  constructor(props) {
    super(props);

    this.state = {
      showActions: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleAction = this.toggleAction.bind(this);
  }

  componentDidUpdate() {
    if (!this.state.showActions && this.props.inputMode != 'message') {
      this.props.changeInputMode('message');
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

  render() {
    return (
      <div>
        <div className={this.getCss()}>
          <button type="button" name="button" onClick={this.toggleAction}>
            <i className="fa fa-plus-circle" aria-hidden="true"></i>
          </button>
          <label className="item-input-wrapper">
            <form className="new-msg" onSubmit={this.handleSubmit} >
              <input type="text" name="name" ref="textInput"/>
            </form>
          </label>
          <button type="button" name="button" onClick={this.handleSubmit}>
            <i className="fa fa-paper-plane" aria-hidden="true"></i>
          </button>
        </div>
        {this.state.showActions
          ? <ActionPicker changeInputMode={this.props.changeInputMode}/>
          : ''}
      </div>
    );
  }
}
