import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { Link } from 'react-router';
import { _ } from 'meteor/underscore';

import './GuildItem.css';

export default class GuildItem extends Component {

  constructor(props) {
    super(props);

    this.state = {
      hasJoined: false
    };

    this.joinGuild = this.joinGuild.bind(this);
  }

  componentWillMount() {
    const {
      guild,
      user
    } = this.props;

    if (_.contains(guild.members, user._id)) {
      this.setState({
        hasJoined: true
      });
    }
  }

  joinGuild() {
    Meteor.call('guilds.join', this.props.guild._id);
    this.setState({
      hasJoined: true
    });
  }

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
      <div className="guild">
        <div className="item-content">
          <div className="wrap-img">
            <img src="/img/zorro.jpg" alt="" />
          </div>
          <h2>{guild.name}</h2>
          <p>{this.getMemberCount(guild)}</p>
        </div>
        {this.state.hasJoined ?
          'Vous faites parti de ce groupe.'
          : <button onClick={this.joinGuild}>Join guild</button>}
      </div>
    );
  }
}

GuildItem.propTypes = {
  guild: PropTypes.object.isRequired,
};
