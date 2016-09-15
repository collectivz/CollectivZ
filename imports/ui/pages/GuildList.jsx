import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';

import AppNav from '../components/AppNav.jsx';
import TopNav from '../components/TopNav.jsx';
import GuildItem from '../components/GuildItem.jsx';

export default class GuildList extends Component {

  render() {
    const {
      guilds,
      user
    } = this.props;

    return (
      <div className="screen-box">
        <TopNav text="Groupes"/>
          <div className="sub-container">
            <div className="list">
              {guilds.map(function(guild) {
                 return <GuildItem key={guild._id} guild={guild} user={user}/>;
              })}
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
