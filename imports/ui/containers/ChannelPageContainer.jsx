import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { Channels } from '../../api/channels/collection.js';
import { Guilds } from '../../api/guilds/collection.js';

import ChannelPage from '../pages/ChannelPage.jsx';

export default createContainer(({ params }) => {
  const id = params.groupId;
  const channelSub = Meteor.subscribe('chanPage', id);
  const channel = Channels.findOne(id);
  let guild;

  if (channelSub.ready() && channel) {
    guild = Guilds.findOne({_id: channel.rootId});
  }
  return {
    loading: !channelSub.ready(),
    channel,
    guild,
  };
}, ChannelPage);
