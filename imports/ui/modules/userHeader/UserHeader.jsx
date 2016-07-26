import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';

import './UserHeader.css';

export default class UserHeader extends Component {
  getUserBg() {
    const user = Meteor.user();
    if (user && user.profile && user.profile.background)
      return "url('" + user.profile.background + "')";
    else {
      return "url('/img/ugly.jpg')";
    }
  }

  getUserAvatar() {
    const user = Meteor.user();
    if (user && user.profile && user.profile.avatar)
      return user.profile.avatar;
    else {
      return '/img/zorro.jpg';
    }
  }

  render() {
    return (
      <div className="header-wrapper">
        <div className="user-bg-wrapper" style={{background: this.getUserBg()}}>
        </div>
        <div className="info">
          <img className="avatar" src={this.getUserAvatar()}/>
          <h2 className='username'>{Meteor.user().username}</h2>
        </div>
      </div>
    );
  }

}
