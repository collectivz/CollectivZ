import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

// import Channel from '../channel/Channel.jsx';
import './ChatPage.css';
import TopNav from '../modules/topNav/TopNav.jsx';

import { Chans, Msgs } from '../../api/collections.js';
import MsgItem from '../modules/msgItem/MsgItem.jsx';
import MsgInput from '../modules/msgInput/MsgInput.jsx';

export default class ChatPage extends Component {
  componentDidMount() {
    const box = document.getElementById('scrollBox');
    box.scrollTop += box.scrollHeight;
  }

  componentDidUpdate() {
    const box = document.getElementById('scrollBox');
    box.scrollTop += box.scrollHeight;
  }

  render() {
    return (
      <div>
        <TopNav text={this.props.chanName}/>
        <div className="pane">
          <div className="scroll-content has-chanbar has-tabs has-footer chat " id="scrollBox">
            <div className="scroll">
              <div className="message-list">
                {this.props.msgs.map(function(msg) {
                   return <MsgItem key={msg._id} msg={msg} />;
                })}
              </div>
            </div>
          </div>
          <MsgInput chanId={this.props.chanId}/>
        </div>
      </div>
    );
  }
}

ChatPage.propTypes = {
  msgs: PropTypes.array.isRequired,
  chanName: PropTypes.string.isRequired,
  chanId: PropTypes.string.isRequired,
}
