import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { _ } from 'meteor/underscore';

import { Guilds } from './collection.js';
import { Channels } from '../channels/collection.js';

Meteor.methods({

  'guilds.insert'(guildName) {
    if (!this.userId) {
      throw new Meteor.Error('not-logged-in',
        'Vous devez être connecté pour créer une guilde.');
    }
    check(guildName, String);

    let guild = {
      name: guildName
    };

    const guildId = Guilds.insert(guild);

    let channel = {
      name: guildName,
      depth: 1,
      parentId: guildId,
    };

    const channelId = Channels.insert(channel);

    Guilds.update(guildId, {
      $inc: { 'connections.chanCount': 1, 'connections.membersCount': 1 },
      $set: { mainChannel: channelId },
    });
    Meteor.users.update(this.userId,
      { $push: { subscribedGuilds: guildId, subscribedChannels: channelId } },
      { $inc: { 'connections.guildsCount': 1 } }
    );
  },

  'guilds.join'(guildId) {
    if (!this.userId) {
      throw new Meteor.Error('not-logged-in',
        'Vous devez être connecté pour rejoindre une guilde.');
    }

    check(guildId, String);

    const guild = Guilds.findOne(guildId);
    const user = Meteor.users.findOne(this.userId);

    if (!guild) {
      throw new Meteor.Error('does not exist',
        "Cette guilde n'existe pas.");
    } else if (_.contains(user.subscribedGuilds, guildId)) {
      throw new Meteor.Error('already joined',
        "Vous faites déjà parti de cette guilde.");
    }

    Meteor.users.update(this.userId,
      { $push: { subscribedGuilds: guildId, subscribedChannels: guild.mainChannel } },
      { $inc: { 'connections.guildsCount': 1 } }
    );
    Guilds.update(guildId,
      { $push: { members: user._id } },
      { $inc: { 'connections.membersCount': 1 } }
    );
  }
});
