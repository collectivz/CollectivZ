import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import ReactDOM from 'react-dom';
import xhr from 'xhr';

import './Profile.css';
import UserHeader from '../modules/userHeader/UserHeader.jsx';
import UpdateAvatar from '../modules/updateAvatar/UpdateAvatar.jsx';
import UpdateBg from '../modules/updateBg/UpdateBg.jsx';

export default React.createClass({
  handleThatEvent: function(e){
    e.preventDefault();
    Meteor.logout();
  },
  render: function(){
    return (
      <div className="view-container">
        <UserHeader/>
        <div className='has-user-header'>
          <UpdateAvatar/>
          <UpdateBg/>
          <button onClick={this.handleThatEvent}>logout</button>
        </div>
      </div>
      );
  }
});
