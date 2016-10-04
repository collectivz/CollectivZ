import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { _ } from 'meteor/underscore';

import { Channels } from '../../api/channels/collection.js';

import ChannelList from '../pages/ChannelList.jsx'

export default createContainer(({ user }) => {
  const channelSub = Meteor.subscribe('chanList', user.subscribedChannels, user.subscribedConversations);
  const unreadSub = Meteor.subscribe('unread-count');
  const userChannels = user.subscribedChannels.concat(user.subscribedConversations);
  const channelRoots = Channels.find(
    {_id: {$in: userChannels}, type: { $in: ['conversation', 'group'] } },
    { sort: { lastActivity: -1 } }).fetch();
  const unreadCounts = UnreadCount.find().fetch();
  const actions = Channels.find(
    { _id: { $in: user.subscribedChannels }, type: 'channel' },
  ).fetch().filter((action) => {
    return !_.contains(user.subscribedChannels, action.rootId);
  });
  const channels = channelRoots.concat(actions).sort((a, b) => {
    return a.lastActivity - b.lastActivity;
  });

  return {
    channels,
    unreadCounts,
    loading: !channelSub.ready(),
  };
}, ChannelList);
