import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';

import './MyProfile.css';
import UserHeader from '../components/UserHeader.jsx';
import AppNav from '../components/AppNav.jsx';
import UpdateAvatar from '../components/UpdateAvatar.jsx';
import UpdateBg from '../components/UpdateBg.jsx';

export default class MyProfile extends Component {

  logout(e){
    e.preventDefault();
    Meteor.logout();
  }

  render() {
    const {
      user
    } = this.props;

    return (
      <div className="view-container">
        <UserHeader user={user}/>
        <div className='has-user-header'>
          <UpdateAvatar />
          <UpdateBg />
          <button onClick={this.logout}>logout</button>
        </div>
        <AppNav user={user} />
      </div>
      );
  }
}
