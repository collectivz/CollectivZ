import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { Link } from 'react-router';

// Task component - represents a single todo item
export default class Channel extends Component {
  constructUrl(id) {
    return "/chat/" + id;
  }

  render() {
    return (
      <div className="item-avatar item-icon-right item item-complex item-right-editable">
        <Link className="item-content" to={this.constructUrl(this.props.channel._id)}>
          <img src="/img/zorro.jpg" alt="" />
          <h2>Zorro</h2>
          <p>Plus que 8 heures pour remplir ta <em>mission !</em></p>
          <span className="last-message-timestamp">Hier</span>
          <i className="fa fa-chevron-right fa-accessory"></i>
        </Link>
      </div>
    );
  }
}

Channel.propTypes = {
  channel: PropTypes.object.isRequired,
};
