import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';

import AppNav from '../imports/ui/modules/appNav/AppNav.jsx';

import Chat from '../imports/ui/pages/Chat.jsx';
import Chans from '../imports/ui/pages/Chans.jsx';
import Contacts from '../imports/ui/pages/Contacts.jsx';
import Guildes from '../imports/ui/pages/Guildes.jsx';
import Profile from '../imports/ui/pages/Profile.jsx';
import Login from '../imports/ui/pages/Login.jsx';
import NotFound from '../imports/ui/pages/NotFound.jsx';

import { Router, Route, hashHistory } from 'react-router';

Meteor.startup(() => {
  render((
    <Router history={hashHistory}>
      <Route path="/" component={AppNav}>
        <Route path="/chans" component={Chans}/>
        <Route path="/chat/:chatId" component={Chat}/>
        <Route path="/contacts" component={Contacts}/>
        <Route path="/guildes" component={Guildes}/>
        <Route path="/profil" component={Profile}/>
        <Route path='/login' component={Login} />
        <Route path='/*' component={NotFound} />
      </Route>
    </Router>
  ), document.getElementById('render-target'));
});
