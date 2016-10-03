import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

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

  return {
    channelRoots,
    unreadCounts,
    loading: !channelSub.ready(),
  };
}, ChannelList);
