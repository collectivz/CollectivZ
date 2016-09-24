import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { UnreadCount } from '../../api/users/client/unread-count.js';
import App from '../layout/App.jsx'

export default createContainer(() => {
  const userSub = Meteor.subscribe('user');
  const unreadSub = Meteor.subscribe('unread-count');
  let unreadTotal = 0

  UnreadCount.find().fetch().forEach(count => {
    unreadTotal += count.count;
  });

  return {
    user: Meteor.user(),
    loading: !userSub.ready(),
    unreadTotal
  };
}, App);
