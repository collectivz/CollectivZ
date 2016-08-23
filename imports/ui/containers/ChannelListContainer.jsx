import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { Channels } from '../../api/channels/collection.js';

import ChannelList from '../pages/ChannelList.jsx'

export default createContainer(({ user }) => {
  console.log(user);
  const channelSub = Meteor.subscribe('chanList', user.subscribedChannels);
  const channels = Channels.find(
    {_id: {$in: user.subscribedChannels}},
    { sort: { lastActivity: -1 } }).fetch();

  return {
    channels,
    loading: !channelSub.ready(),
  };
}, ChannelList);
