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
import GuildPageContainer from '../imports/ui/containers/GuildPageContainer.jsx';
import HistoryPageContainer from '../imports/ui/containers/HistoryPageContainer.jsx';
import AdminPage from '../imports/ui/pages/AdminPage.jsx';
import MyProfile from '../imports/ui/pages/MyProfile.jsx';
import NotFound from '../imports/ui/pages/NotFound.jsx';

Meteor.startup(() => {
  render((
    <Router history={browserHistory}>
      <Route path="/" component={AppContainer}>
        <Route path='/my-groups' component={ChannelListContainer} />
        <Route path='/group/:groupId' component={ChannelPageContainer} />
        <Route path='/guild-list' component={GuildListContainer} />
        <Route path='/guild/:guildId' component={GuildPageContainer} />
        <Route path='/conversation/:conversationId' component={ConversationPageContainer} />
        <Route path='/admin' component={AdminPage} />
        <Route path='/profile' component={MyProfile} />
        <Route path='/contact' component={ContactPageContainer} />
        <Route path='/history/:userId' component={HistoryPageContainer} />
        <Route path='*' component={NotFound} />
      </Route>
    </Router>
  ), document.getElementById('render-target'));
});
