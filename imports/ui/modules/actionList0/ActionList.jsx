import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';

// import { Chans } from '../../api/channels.js';
// import Channel from '../channel/Channel.jsx';
import './ActionList.css';

export default class ActionList extends Component {

  // handleSubmit(event) {
  //   event.preventDefault();
  //   const msg = ReactDOM.findDOMNode(this.refs.textInput).value.trim();
  //   let message = {
  //     text: msg,
  //     chanId: this.props.chanId,
  //   }
  //   Meteor.call('newMessage', message, (err, res) => {
  //     if(err) {
  //       console.log(err);
  //     }
  //     ReactDOM.findDOMNode(this.refs.textInput).value = '';
  //   });
  // }
  //

  render() {
    console.log('here');
    return (

      <div className="view-container has-tabs">
        <div className="action-list">
          <a href="#">1</a>
          <a href="#">2</a>
          <a href="#">3</a>
        </div>
      </div>
    );
  }
}

// ActionList.propTypes = {
//   channel: PropTypes.object.isRequired,
// };
