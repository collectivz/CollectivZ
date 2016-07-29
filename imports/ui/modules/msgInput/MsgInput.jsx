import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';

// import { Chans } from '../../api/channels.js';
// import Channel from '../channel/Channel.jsx';
import './MsgInput.css';
import ActionList from '../actionList/ActionList.jsx';

export default React.createClass({

  getInitialState() {
    return {
      showActions: false
    }
  },
  handleSubmit(event) {
    event.preventDefault();
    const msg = ReactDOM.findDOMNode(this.refs.textInput).value.trim();
    let message = {
      text: msg,
      chanId: this.props.chanId,
    }
    Meteor.call('newMessage', message, (err, res) => {
      if(err) {
        console.log(err);
      }
      ReactDOM.findDOMNode(this.refs.textInput).value = '';
    });
  },
  handleClick() {
    this.setState({
      showActions: !this.state.showActions
    })
    console.log('plus sign clicked');
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
        {this.state.showActions ? <ActionList/> : ''}
      </div>
    );
  }
})

// MsgInput.propTypes = {
//   channel: PropTypes.object.isRequired,
// };
