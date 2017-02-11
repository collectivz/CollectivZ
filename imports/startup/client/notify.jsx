import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { browserHistory, Router, Route, Link, withRouter, hashHistory } from 'react-router';

import AppContainer from '../imports/ui/containers/AppContainer.jsx';
import ChannelListContainer from '../imports/ui/containers/ChannelListContainer.jsx';
import ContactPageContainer from '../imports/ui/containers/ContactPageContainer.jsx';
import ChannelPageContainer from '../imports/ui/containers/ChannelPageContainer.jsx';
import ConversationPageContainer from '../imports/ui/containers/ConversationPageContainer.jsx';
import GroupListContainer from '../imports/ui/containers/GroupListContainer.jsx';
import ProfilePageContainer from '../imports/ui/containers/ProfilePageContainer.jsx';
import PublicProfileContainer from '../imports/ui/containers/PublicProfileContainer';
import MyProfileContainer from '../imports/ui/containers/MyProfileContainer.jsx';
import AdminPageContainer from '../imports/ui/containers/AdminPageContainer.jsx';
import CirclePageContainer from '../imports/ui/containers/CirclePageContainer.jsx';
import RegisterPage from '../imports/ui/pages/RegisterPage.jsx';
import PasswordLost from '../imports/ui/components/PasswordLost.jsx';
import NotFound from '../imports/ui/pages/NotFound.jsx';
import HeroPicker from '../imports/ui/components/HeroPicker';
import InformationsEdit from '../imports/ui/components/InformationsEdit';
import CurrentGroupsContainer from '../imports/ui/containers/CurrentGroupsContainer';
import CurrentActionsContainer from '../imports/ui/containers/CurrentActionsContainer';
import SkillsEdit from '../imports/ui/components/SkillsEdit';
import UserHistory from '../imports/ui/components/UserHistory';
import configureStore from '../imports/ui/store/store';

const store = configureStore();

Meteor.startup(() => {
   Push.Configure({
      android: {
         senderID: 354968128746,
         alert: true,
         badge: true,
         sound: true,
         vibrate: true,
         clearNotifications: true,
         // icon: '',
         // iconColor: ''
      },
      ios: {
         alert: true,
         badge: true,
         sound: true,
      },
   });

   Push.enabled(true); // Will enable notifications (requires a token...)
});

