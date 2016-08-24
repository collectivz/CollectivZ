import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';

import './UserHeader.css';

export default class UserHeader extends Component {

  getUserBg(user) {
    if (user && user.profile && user.profile.background)
      return "url('" + user.profile.background + "')";
    else {
      return "url('/img/ugly.jpg')";
    }
  }

  getUserAvatar(user) {
    if (user && user.profile && user.profile.avatar)
      return user.profile.avatar;
    else {
      return '/img/zorro.jpg';
    }
  }

  render() {
    const {
      user
    } = this.props;

    return (
      <div className="header-wrapper">
        <div className="user-bg-wrapper" style={{background: this.getUserBg(user)}}>
        </div>
        <div className="info">
          <img className="avatar" src={this.getUserAvatar(user)}/>
          <h2 className='username'>{user.username}</h2>
        </div>
      </div>
    );
  }

}
