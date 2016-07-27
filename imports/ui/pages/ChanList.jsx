import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import TopNav from '../modules/topNav/TopNav.jsx';
import { Chans } from '../../api/collections.js';
import ChanItem from '../modules/chanItem/ChanItem.jsx';
import './ChanList.css';

export default class ChanList extends Component {

  render() {
    return (
      <div>
        <TopNav text="Chans"/>
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
      </div>
    );
  }
}

ChanList.propTypes = {
  channels: PropTypes.array.isRequired,
}
