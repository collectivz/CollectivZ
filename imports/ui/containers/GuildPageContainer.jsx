import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { Guilds } from '../../api/guilds/collection.js';
import { Channels } from '../../api/channels/collection.js';

import GuildPage from '../pages/GuildPage.jsx';

export default createContainer(({ params, user }) => {
  const id = params.guildId;
  const guildSub = Meteor.subscribe('guildPage', id);
  const guild = Guilds.findOne(id);
  const channels = Channels.find({ rootId: id, depth: 2 }).fetch();
  const members = Meteor.users.find({ subscribedGuilds: { $in: [id] } }).fetch();

  return {
    loading: !guildSub.ready(),
    guild,
    channels,
    members,
    user
  };
}, GuildPage);
