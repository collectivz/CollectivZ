import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { Link } from 'react-router';
import { _ } from 'meteor/underscore';

// import { Chans } from '../../api/channels.js';
// import Channel from '../channel/Channel.jsx';
import './ChanItem.css';

class ChanItem extends React.Component {

  constructor(props) {
    super(props);
    this.constructUrl = this.constructUrl.bind(this);
  }

  constructUrl(id) {
    return "/chat/" + id;
  }

  render() {
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
        <Link className="item-content" to={this.constructUrl(this.props.channel._id)}>
          <img src="/img/zorro.jpg" alt="" />
          <h2>{this.props.channel.name}</h2>
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

ChanItem.propTypes = {
  channel: PropTypes.object.isRequired,
};

// <span className="last-message-timestamp">{this.props.?}</span>
export default ChanItem;
