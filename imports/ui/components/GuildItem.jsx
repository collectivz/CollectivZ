import React, { Component, PropTypes }          from 'react';
import { Meteor }                               from 'meteor/meteor';
import { Router, Route, Link, browserHistory }  from 'react-router';
import { _ }                                    from 'meteor/underscore';
import TouchEvent                               from './TouchEvent';
import classNames                               from 'classnames';

export default class GuildItem extends Component {

  getMemberCount(data) {
    if (data.members.length === 1) {
      return `${data.members.length} membre.`;
    } else {
      return `${data.members.length} membres.`;
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
      data
    } = this.props;

    return (
      <TouchEvent class="list-item touch-event" onClick={ () => { this.onClick(`/group/${data._id}`) } }>
        <img src={data.imageUrl} alt="" />
        <div className="list-item-content">
            <p className="title">{data.name}</p>
            <div className="tag">
              <i className="icon icon-user"/>
              <span>{this.getMemberCount(data)}</span>
            </div>
        </div>
      </TouchEvent>
    );
  }
}

GuildItem.propTypes = {
  data: PropTypes.object,
};
