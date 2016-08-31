import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { Guilds } from '../../api/guilds/collection.js';

import GuildPage from '../pages/GuildPage.jsx';

export default createContainer(({ params }) => {
  const id = params.guildId;
  const guildSub = Meteor.subscribe('guildPage', id);
  const guild = Guilds.findOne(id);

  return {
    loading: !guildSub.ready(),
    guild,
  };
}, GuildPage);
