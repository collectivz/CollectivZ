import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';

// import { Chans } from '../../api/channels.js';
// import Channel from '../channel/Channel.jsx';
import './MsgInput.css';
import ActionList from '../actionList/ActionList.jsx';

export default React.createClass({

  componentDidUpdate() {
    if (!this.state.showActions && this.props.inputMode != 'message') {
      this.props.changeInputMode('message');
    }
  },
  getInitialState() {
    return {
      showActions: false
    }
  },
  handleSubmit(event) {
    event.preventDefault();
    const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();

    if (this.props.inputMode === 'message') {
      let message = {
        text,
        channelId: this.props.chanId,
      };

      Meteor.call('messages.insert', message, (err, res) => {
        if(err) {
          console.log(err);
        }
        ReactDOM.findDOMNode(this.refs.textInput).value = '';
      });
    } else {
      this.props.answerToZorro(text);
      ReactDOM.findDOMNode(this.refs.textInput).value = '';
    }
  },
  handleClick() {
    this.setState({
      showActions: !this.state.showActions
    });
    this.props.toggleMarginBottom();
  },
  getCss() {
    if (this.state.showActions)
      return "bar-stable bar bar-footer has-tabs item-input-inset has-actions-list";
    else {
      return "bar-stable bar bar-footer has-tabs item-input-inset";
    }
  },
  render() {
    return (
      <div>
        <div className={this.getCss()}>
          <button type="button" name="button" onClick={this.handleClick}>
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
          ? <ActionList changeInputMode={this.props.changeInputMode}/>
          : ''}
      </div>
    );
  }
})

// MsgInput.propTypes = {
//   channel: PropTypes.object.isRequired,
// };
