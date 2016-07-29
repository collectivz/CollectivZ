import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import TopNav from '../modules/topNav/TopNav.jsx';
import Guilds from '../../api/guilds/collection.js';
import GuildItem from '../modules/guildItem/GuildItem.jsx';

import './GuildList.css';

export default class GuildList extends Component {

  render() {
    return (
      <div>
        <TopNav text="GUILDES"/>
        <div className="view-container">
          <div className="page-wrapper">
            <div className="scroll-content has-top-nav has-tabs-nav">
              <div className="disable-user-behavior">
                <div className="list">
                  {this.props.guildes.map(function(guilde) {
                     return <GuildItem key={guilde._id} guilde={guilde} />;
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

GuildList.propTypes = {
  guildes: PropTypes.array.isRequired,
}
