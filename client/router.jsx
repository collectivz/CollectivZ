import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';

import App from '../imports/ui/layout/App.jsx';
import Channels from '../imports/ui/channels/Channels.jsx';
import Chat from '../imports/ui/chat/Chat.jsx';
import Contacts from '../imports/ui/pages/Contacts.jsx';
import Guildes from '../imports/ui/pages/Guildes.jsx';
import Profile from '../imports/ui/pages/Profile.jsx';
import NotFound from '../imports/ui/NotFound.jsx';

import { Router, Route, hashHistory } from 'react-router';

Meteor.startup(() => {
  render((
    <Router history={hashHistory}>
      <Route path="/" component={App}>
        <Route path="/channels" component={Channels}/>
        <Route path="/chat/:id" component={Chat}/>
        <Route path="/contacts" component={Contacts}/>
        <Route path="/guildes" component={Guildes}/>
        <Route path="/profil" component={Profile}/>
      </Route>
      <Route path='*' component={NotFound} />
    </Router>
  ), document.getElementById('render-target'));
});
