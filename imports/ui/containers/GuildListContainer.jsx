import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { Guilds } from '../../api/guilds/collection.js';

import GuildList from '../pages/GuildList.jsx';

export default createContainer(() => {
  const guildSub = Meteor.subscribe('guildList');
  const guilds = Guilds.find({}, { sort: { name: 1 } }).fetch();
  
  return {
    loading: !guildSub.ready(),
    guilds,
  };
}, GuildList);
