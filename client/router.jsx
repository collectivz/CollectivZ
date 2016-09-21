import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { browserHistory, Router, Route, Link, withRouter, hashHistory } from 'react-router'

import AppContainer from '../imports/ui/containers/AppContainer.jsx';
import ChannelListContainer from '../imports/ui/containers/ChannelListContainer.jsx';
import ContactPageContainer from '../imports/ui/containers/ContactPageContainer.jsx';
import ChannelPageContainer from '../imports/ui/containers/ChannelPageContainer.jsx';
import ConversationPageContainer from '../imports/ui/containers/ConversationPageContainer.jsx';
import GuildListContainer from '../imports/ui/containers/GuildListContainer.jsx';
import ProfilePageContainer from '../imports/ui/containers/ProfilePageContainer.jsx';
import MyProfileContainer from '../imports/ui/containers/MyProfileContainer.jsx';
import CreateGroupPageContainer from '../imports/ui/containers/CreateGroupPageContainer.jsx';
import TeamPageContainer from '../imports/ui/containers/TeamPageContainer.jsx';
import AdminPage from '../imports/ui/pages/AdminPage.jsx';
import RegisterPage from '../imports/ui/pages/RegisterPage.jsx';
import NotFound from '../imports/ui/pages/NotFound.jsx';

Meteor.startup(() => {
  render((
    <Router history={browserHistory}>
    <Route path='/register' component={RegisterPage} />
      <Route path="/" component={AppContainer}>
        <Route path='/my-groups' component={ChannelListContainer} />
        <Route path='/group/:groupId' component={ChannelPageContainer} />
        <Route path='/guild-list' component={GuildListContainer} />
        <Route path='/conversation/:conversationId' component={ConversationPageContainer} />
        <Route path='/team/:teamId' component={TeamPageContainer} />
        <Route path='/admin' component={AdminPage} />
        <Route path='/contact/view' component={ContactPageContainer} />
        <Route path='/contact/createGroup' component={CreateGroupPageContainer} />
        <Route path='/profile' component={MyProfileContainer} />
        <Route path='/user/:userId' component={ProfilePageContainer} />
        <Route path='*' component={NotFound} />
      </Route>
    </Router>
  ), document.getElementById('render-target'));
});
