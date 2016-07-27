import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { Link } from 'react-router';

// import { Chans } from '../../api/channels.js';
// import Channel from '../channel/Channel.jsx';
import './GuildItem.css';

export default class GuildItem extends Component {
  constructUrl(id) {
    return "/guild/" + id;
  }



  render() {
    return (
      <div className="guild">
        <Link className="item-content" to={this.constructUrl(this.props.guilde._id)}>
          <div className="wrap-img">
            <img src="/img/zorro.jpg" alt="" />
          </div>
          <h2>{this.props.guilde.name}</h2>
          <p>{this.props.guilde.connections.memberCount} member</p>
        </Link>
      </div>
    );
  }
}

GuildItem.propTypes = {
  guilde: PropTypes.object.isRequired,
};
