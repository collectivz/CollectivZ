import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { Link } from 'react-router';
import { _ } from 'meteor/underscore';

import './ChannelItem.css';

export default class ChannelItem extends React.Component {

  constructor(props) {
    super(props);
    this.constructUrl = this.constructUrl.bind(this);
  }

  constructUrl(id) {
    return "/chat/" + id;
  }

  render() {
    const {
      channel
    } = this.props;

    let store = []
    if (this.props.channel.connections) {
      let arr = _.keys(this.props.channel.connections)
      for (var i = 0; i < arr.length; i++) {
        store.push({
          name: arr[i],
          nb: this.props.channel.connections[arr[i]],
        });
      }
    }
    return (
      <div className="item-avatar item-icon-right item item-complex item-right-editable">
        <Link className="item-content" to={`/group/${channel._id}`}>
          <img src="/img/zorro.jpg" alt="" />
          <h2>{channel.name}</h2>
          <div>
            { store.length ? store.map(function(menu, index) {
               return ( <p key={index} >{menu.name + ' ' + menu.nb}</p> );
            }) :  <p>Il est temps de passer à l'action !</p> }
          </div>
          <i className="fa fa-chevron-right fa-accessory"></i>
        </Link>
      </div>
    );
  }
}

ChannelItem.propTypes = {
  channel: PropTypes.object.isRequired,
};
