import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { Channels } from '../../api/channels/collection.js';

import ChannelList from '../pages/ChannelList.jsx'

export default createContainer(({ user }) => {
  const channelSub = Meteor.subscribe('chanList', user.subscribedChannels, user.subscribedConversations);
  const userChannels = user.subscribedChannels.concat(user.subscribedConversations);
  const channels = Channels.find(
    {_id: {$in: userChannels}},
    { sort: { lastActivity: -1 } }).fetch();
  const unreadCounts = UnreadCount.find().fetch();

  return {
    channels,
    unreadCounts,
    loading: !channelSub.ready(),
  };
}, ChannelList);
