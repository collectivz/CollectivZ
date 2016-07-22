import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { Channels } from '../../../api/channels.js';

import '../topNav/TopNav.jsx';
import ChanItem from '../chanItem/ChanItem.jsx';

import './ChanList.css';

class ChansList extends Component {

  render() {
    return (
      <div className="view-container">
        <div className="page-wrapper">
          <div className="scroll-content has-top-nav has-tabs-nav">
            <div className="disable-user-behavior">
              <div className="list">
                {this.props.channels.map(function(channel) {
                   return <ChanItem key={channel._id} channel={channel} />;
                })}
              </div>
            </div>
          </div>
        </div>
        </div>
    );
  }

}

ChansList.propTypes = {
  channels: PropTypes.array.isRequired,
}

export default createContainer(() => {
  Meteor.subscribe('channels');

  console.log(Channels.find({}).fetch());
  return {
    channels: Channels.find({}).fetch(),
  };
}, ChansList);
