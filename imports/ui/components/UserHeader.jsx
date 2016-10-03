import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';

export default class UserHeader extends Component {

  render() {

    const { user } = this.props;

    return (
      <div style={{ backgroundImage: `url('${user.profile.background}')` }} className="profile">
          <div className="profile-header">
              <img src={user.profile.avatar}/>
              <h3>{user.username}</h3>
          </div>
      </div>
    );
  }

}
