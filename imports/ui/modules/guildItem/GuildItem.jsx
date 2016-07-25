import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { Link } from 'react-router';

// import { Chans } from '../../api/channels.js';
// import Channel from '../channel/Channel.jsx';
import './GuildItem.css';

export default class GuildItem extends Component {
  constructUrl(id) {
    return "/chat/" + id;
  }

  render() {
    return (
      <div className="item-avatar item-icon-right item item-complex item-right-editable">
        <Link className="item-content" to={this.constructUrl(this.props.guilde._id)}>
          <img src="/img/zorro.jpg" alt="" />
          <h2>{this.props.guilde.test}</h2>
          <p>Plus que 8 heures pour remplir ta <em>mission !</em></p>
          <span className="last-message-timestamp">Hier</span>
          <i className="fa fa-chevron-right fa-accessory"></i>
        </Link>
      </div>
    );
  }
}

GuildItem.propTypes = {
  guilde: PropTypes.object.isRequired,
};
