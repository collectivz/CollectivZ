import React, { Component, PropTypes }          from 'react';
import { Meteor }                               from 'meteor/meteor';
import { Router, Route, Link, browserHistory }  from 'react-router';
import { _ }                                    from 'meteor/underscore';
import TouchEvent                               from './TouchEvent';
import classNames                               from 'classnames';

export default class GuildItem extends Component {

  getMemberCount(guild) {
    if (guild.members.length === 1) {
      return `${guild.members.length} membre.`
    } else {
      return `${guild.members.length} membres.`
    }
  }

  onClick(dest) {

    setTimeout( () => {
      if (dest) {
        browserHistory.push(dest);
      }
    }, 350 );

  }

  render() {
    const {
      guild
    } = this.props;

    return (
      <TouchEvent class="list-item touch-event" onClick={ () => { this.onClick(`/guild/${guild._id}`) } }>
          <img src={guild.picture} alt="" />
          <div className="list-item-content">
              <p className="title">{guild.name}</p>
              <div className="tag">
                <i className="icon icon-user"/>
                <span>{this.getMemberCount(guild)}</span>
              </div>
          </div>
          <i className="icon icon-3x icon-chevron-right"/>
      </TouchEvent>
    );
  }
}

GuildItem.propTypes = {
  guild: PropTypes.object.isRequired,
};
