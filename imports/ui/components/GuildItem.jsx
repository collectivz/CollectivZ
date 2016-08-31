import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { Link } from 'react-router';
import { _ } from 'meteor/underscore';

import './GuildItem.css';

export default class GuildItem extends Component {

  getMemberCount(guild) {
    if (guild.members.length === 1) {
      return `${guild.members.length} membre.`
    } else {
      return `${guild.members.length} membres.`
    }
  }

  render() {
    const {
      guild
    } = this.props;

    return (
      <div className="guild item-avatar item-icon-right item item-complex item-right-editable">
        <Link className="item-content" to={`/guild/${guild._id}`}>
          <img src={guild.picture} alt="" />
          <h2>{guild.name}</h2>
          <p>{this.getMemberCount(guild)}</p>
          <i className="fa fa-chevron-right fa-accessory"></i>
        </Link>
      </div>
    );
  }
}

GuildItem.propTypes = {
  guild: PropTypes.object.isRequired,
};
