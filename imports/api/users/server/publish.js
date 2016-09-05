import { Meteor } from 'meteor/meteor';

import { Channels } from '../../channels/collection.js';
import { Guilds } from '../../guilds/collection.js';

Meteor.publish('user', function() {
  if (this.userId) {
    let zorro = Meteor.users.findOne({username: 'Zorro'});
    return Meteor.users.find({_id: { $in: [ this.userId,  zorro._id ] }}, {fields: {
      username: 1,
      subscribedGuilds: 1,
      subscribedConversations: 1,
      subscribedChannels: 1,
      connections: 1,
      profile: 1,
      history: 1,
    }});
  } else {
    this.ready();
  }
});

Meteor.publish('userProfile', function(userId) {
  if (this.userId) {
    const user = Meteor.users.findOne(userId);

    return [
      Meteor.users.find(userId),
      Channels.find({ _id: { $in: user.subscribedChannels } }),
      Guilds.find({ _id: { $in: user.subscribedGuilds } })
    ];
  } else {
    this.ready();
  }
});
