import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';

export default class Login extends Component {
  //
  // renderResponse() {
  //   return (
  //     <div key={channel._id} channel={channel}></div>
  //   )
  // }

  handleSubmit(event) {
    event.preventDefault();

    // Find the text field via the React ref
    const name = ReactDOM.findDOMNode(this.refs.textInput).value.trim();
    // const res = ReactDOM.findDOMNode(document.getElementById('bot')).value.trim();

    console.log(ReactDOM.findDOMNode(document.getElementById('bot')));
    // Meteor.call('tasks.insert', text);
    ReactDOM.findDOMNode(document.getElementById('bot')).value = "Thank you " + name, ". What's your password ?";
    // Clear form
    ReactDOM.findDOMNode(this.refs.textInput).value = '';
  }

  render() {
    return (
      <div className="view-container">
        <div>
          <p id='bot'>What's your login ?</p>
        </div>
        <div className="bar-stable bar bar-footer has-tabs item-input-inset">
          <button type="button" name="button">
            <i className="fa fa-plus-circle" aria-hidden="true"></i>
          </button>
          <label className="item-input-wrapper">
            <form className="new-task" onSubmit={this.handleSubmit.bind(this)} >
              <input
                type="text"
                ref="textInput"
                placeholder="Type to add new tasks"
              />
            </form> : ''
          </label>
          <button type="button" name="button">
            <i className="fa fa-paper-plane" aria-hidden="true"></i>
          </button>
        </div>
        {this.props.children}
      </div>
    );
  }

}
