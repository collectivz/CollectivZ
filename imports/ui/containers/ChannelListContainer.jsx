import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { _ } from 'meteor/underscore';

import { Channels } from '../../api/channels/collection.js';

import ChannelList from '../pages/ChannelList.jsx'

export default createContainer(({ user }) => {
  const channelSub = Meteor.subscribe('chanList', user.subscribedChannels, user.subscribedConversations);
  const unreadSub = Meteor.subscribe('unread-count');
  const userChannels = user.subscribedChannels.concat(user.subscribedConversations);
  const groups = Channels.find(
    {_id: {$in: userChannels}, type: 'group' },
    { sort: { lastActivity: -1 } }).fetch();
  const conversations = Channels.find(
    {_id: {$in: userChannels}, type: 'conversation' },
    { sort: { lastActivity: -1 } }).fetch();
  const actions = Channels.find(
    {_id: {$in: userChannels}, type: 'channel' },
    { sort: { lastActivity: -1 } }).fetch();
  const unreadCounts = UnreadCount.find().fetch();

  return {
    groups,
    conversations,
    actions,
    unreadCounts,
    loading: !channelSub.ready(),
  };
}, ChannelList);
