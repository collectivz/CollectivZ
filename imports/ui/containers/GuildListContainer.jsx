import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { Channels } from '../../api/channels/collection.js';

import GuildList from '../pages/GuildList.jsx';

export default createContainer(() => {
  const guildSub = Meteor.subscribe('groupList');
  const guilds = Channels.find({ type: 'group' }, { sort: { name: 1 } }).fetch();

  return {
    loading: !guildSub.ready(),
    guilds,
  };
}, GuildList);
