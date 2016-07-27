import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { browserHistory, Router, Route, Link, withRouter, hashHistory } from 'react-router'

import Layout from '../imports/ui/Layout.jsx';

import ChanListContainer from '../imports/ui/containers/ChanListContainer.jsx';
import ChanPageContainer from '../imports/ui/containers/ChanPageContainer.jsx';
import GuildListContainer from '../imports/ui/containers/GuildListContainer.jsx';
import GuildPageContainer from '../imports/ui/containers/GuildPageContainer.jsx';
// import GuildPage from '../imports/ui/containers/GuildContainer.jsx';
import AdminPage from '../imports/ui/pages/AdminPage.jsx';
import Profile from '../imports/ui/pages/Profile.jsx';
import Login from '../imports/ui/pages/Login.jsx';
import NotFound from '../imports/ui/pages/NotFound.jsx';

Meteor.startup(() => {

  render((
    <Router history={hashHistory}>
      <Route path="/" component={Layout}>
        <Route path="chans" component={ChanListContainer}/>
        <Route path="chat/:chatId" component={ChanPageContainer}/>
        <Route path="admin" component={AdminPage}/>
        <Route path="guildes" component={GuildListContainer}/>
        <Route path="guild/:guildId" component={GuildPageContainer}/>
        <Route path="profil" component={Profile}/>
        <Route path='*' component={NotFound} />
      </Route>
    </Router>
  ), document.getElementById('render-target'));
});
