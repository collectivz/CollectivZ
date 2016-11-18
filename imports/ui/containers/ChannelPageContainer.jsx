import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { Channels } from '../../api/channels/collection.js';

import ChannelPage from '../pages/ChannelPage.jsx';

export default createContainer(({ params, user }) => {
  const id = params.groupId;
  const channelSub = Meteor.subscribe('chanPage', id);
  const channel = Channels.findOne(id);
  const users = Meteor.users.find({ subscribedChannels: { $in: [id] } }).fetch();
  let group;

  if (channelSub.ready() && channel) {
    group = Channels.findOne({_id: channel.rootId});
  }
  return {
    loading: !channelSub.ready(),
    channel,
    group,
    users,
    user
  };
}, ChannelPage);
