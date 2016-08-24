import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';

import AppNav from '../components/AppNav.jsx';
import TopNav from '../components/TopNav.jsx';
import GuildItem from '../components/GuildItem.jsx';

import './GuildList.css';

export default class GuildList extends Component {

  render() {
    const {
      guilds,
      user
    } = this.props;

    return (
      <div>
        <TopNav text="Liste des groupes"/>
        <div className="view-container">
          <div className="page-wrapper">
            <div className="scroll-content has-top-nav has-tabs-nav">
              <div className="disable-user-behavior">
                <div className="list">
                  {guilds.map(function(guild) {
                     return <GuildItem key={guild._id} guild={guild} user={user}/>;
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
        <AppNav user={user}/>
      </div>
    );
  }
}

GuildList.propTypes = {
  guilds: PropTypes.array.isRequired,
}
