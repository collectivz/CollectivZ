import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import { Guilds } from '../collection.js';
import { Channels } from '../../channels/collection.js';

Meteor.publish('guildList', function(){
  if (this.userId) {
    return Guilds.find({});
  } else {
    this.ready();
  }
});

Meteor.publish('guildPage', function(id) {
  check(id, String);

  return [
    Guilds.find({_id: id}),
    Channels.find({rootId: id, depth: 2}),
    Meteor.users.find({ subscribedGuilds: { $in: [id] } })
  ];
});
