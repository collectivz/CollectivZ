import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Link } from 'react-router';
import { _ } from 'meteor/underscore';

export default class ConversationPageHeader extends Component {

  render() {
    const {
      channel,
    } = this.props;

    return (
      <div className="top-nav">
        <Link className="tweakChevron" to={'/my-groups'}><i className="fa fa-chevron-left"></i></Link>
        <div className="title">
          <h2>{`${channel.name}`}</h2>
        </div>
      </div>
    );
  }
}
