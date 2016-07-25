import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { browserHistory, Router, Route, Link, withRouter, hashHistory } from 'react-router'

import Layout from '../imports/ui/Layout.jsx';

import ChatPage from '../imports/ui/containers/ChatContainer.jsx';
import ChanPage from '../imports/ui/containers/ChanContainer.jsx';
import GuildPage from '../imports/ui/containers/GuildContainer.jsx';
import Contacts from '../imports/ui/pages/Contacts.jsx';
import Profile from '../imports/ui/pages/Profile.jsx';
import Login from '../imports/ui/pages/Login.jsx';
import NotFound from '../imports/ui/pages/NotFound.jsx';

Meteor.startup(() => {

  render((
    <Router history={hashHistory}>
      <Route path="/" component={Layout}>
        <Route path="chans" component={ChanPage}/>
        <Route path="chat/:chatId" component={ChatPage}/>
        <Route path="contacts" component={Contacts}/>
        <Route path="guildes" component={GuildPage}/>
        <Route path="profil" component={Profile}/>
        <Route path='*' component={NotFound} />
      </Route>
    </Router>
  ), document.getElementById('render-target'));
});
