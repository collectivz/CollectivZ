import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';

import AppNav from '../components/AppNav.jsx';
import Breadcrumb from '../components/Breadcrumb.jsx';
import List   from '../components/List';
import GuildItem from '../components/GuildItem.jsx';

export default class GuildList extends Component {

  render() {
    const {
      guilds,
      user
    } = this.props;

    return (
      <div className="screen-box">
        <Breadcrumb title="Groupes" hasBack={false} />
          <div className="sub-container">
            <List data={guilds} user={user} type="guild"/>
          </div>
        <AppNav user={user}/>
      </div>
    );
  }
}

GuildList.propTypes = {
  guilds: PropTypes.array.isRequired,
}
