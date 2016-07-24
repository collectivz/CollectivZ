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

  render() {
    return (
      <div>
        <TopNav text={this.props.chan}/>
        <div className="pane">
          <div className="scroll-content has-chanbar has-tabs has-footer chat ">
            <div className="scroll">
              <div className="message-list">
                <div className="message-wrapper">
                  <div className="message message-mine">
                    <div className="message-header">
                      <span className="message-user">Cfe-cgc</span>
                      <span className="message-timestamp">hier</span>
                    </div>
                    <div className="text">
                      Salut Zorro, comment ça va aujourd'hui ?
                    </div>
                    <span className="picture">
                      <img src="/img/cfecgc.png" alt="" />
                    </span>
                  </div>
                </div>

              </div>
              <MsgInput/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ChatPage.propTypes = {
  msgs: PropTypes.array.isRequired,
  chan: PropTypes.string.isRequired,
}
