import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';

import './AdminPage.css';
import AppNav from '../components/AppNav.jsx';
import TopNav from '../components/TopNav.jsx';

import GuildInput from '../components/GuildInput.jsx';

export default class AdminPage extends Component {

  render() {
    const {
      user
    } = this.props;

    return (
      <div>
        <TopNav text="Config admin"/>
          <GuildInput/>
        <AppNav user={user} />
      </div>
    );
  }
}
