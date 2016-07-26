import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import './AdminPage.css';
import TopNav from '../modules/topNav/TopNav.jsx';

import GuildInput from '../modules/guildInput/GuildInput.jsx';

export default React.createClass({

  render() {
    return (
      <div>
        <TopNav text="Config admin"/>
          <GuildInput/>
      </div>
    );
  }
});
