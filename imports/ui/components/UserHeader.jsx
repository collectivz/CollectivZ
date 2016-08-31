import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';

import './UserHeader.css';

export default class UserHeader extends Component {

  render() {
    const {
      user
    } = this.props;

    return (
      <div className="header-wrapper">
        <div className="user-bg-wrapper" style={{background: `url('${user.profile.background}')`}}>
        </div>
        <div className="info">
          <img className="avatar" src={user.profile.avatar}/>
          <h2 className='username'>{user.username}</h2>
        </div>
      </div>
    );
  }

}
