import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { _ } from 'meteor/underscore';

import { Guilds } from './collection.js';
import { Channels } from '../channels/collection.js';

Meteor.methods({

  'guilds.insert'(guildName) {
    if (!this.userId) {
      throw new Meteor.Error('not-logged-in',
        'Vous devez être connecté pour créer une projet.');
    }
    check(guildName, String);

    if (guildName.length === 0) {
      throw new Meteor.Error('no-name',
        'Une projet doit porter un nom.');
    }

    let guild = {
      name: guildName
    };

    const guildId = Guilds.insert(guild);

    let channel = {
      name: guildName,
      depth: 1,
      parentId: guildId,
      rootId: guildId,
      type: 'group'
    };

    const channelId = Channels.insert(channel);

    Guilds.update(guildId, {
      $inc: { 'connections.chanCount': 1, 'connections.memberCount': 1 },
      $set: { mainChannel: channelId },
    });

    const lastReadField = `lastReadAt.${channelId}`;
    Meteor.users.update(this.userId, {
      $push: { subscribedGuilds: guildId, subscribedChannels: channelId },
      $inc: { 'connections.guildCount': 1 },
      $set: { [lastReadField]: Date.now() }
    });

    return channelId;
  },

  'guilds.join'(guildId) {
    if (!this.userId) {
      throw new Meteor.Error('not-logged-in',
        'Vous devez être connecté pour rejoindre une projet.');
    }

    check(guildId, String);

    const guild = Guilds.findOne(guildId);
    const user = Meteor.users.findOne(this.userId);

    if (!guild) {
      throw new Meteor.Error('does not exist',
        "Cette projet n'existe pas.");
    } else if (_.contains(user.subscribedGuilds, guildId)) {
      throw new Meteor.Error('already joined',
        "Vous faites déjà parti de cette projet.");
    }

    const channel = Channels.findOne(guild.mainChannel);

    const lastReadField = `lastReadAt.${channel._id}`;
    Meteor.users.update(this.userId, {
      $push: { subscribedGuilds: guildId, subscribedChannels: guild.mainChannel },
      $inc: { 'connections.guildCount': 1 },
      $set: { [lastReadField]: Date.now() }
    });
    Guilds.update(guildId, {
      $push: { members: user._id },
      $inc: { 'connections.memberCount': 1 }
    });
  },

  'guilds.changeName'(newName, guildId) {
    if (!this.userId) {
      throw new Meteor.Error('not-logged-in',
        'Vous devez être connecté pour renommer une projet.');
    }

    check(newName, String);
    check(guildId, String);

    const guild = Guilds.findOne(guildId);
    const user = Meteor.users.findOne(this.userId);

    if (!guild) {
      throw new Meteor.Error('does not exist',
        "Cette projet n'existe pas.");
    }

    if (!_.contains(guild.leaders, user._id) || !user.profile.admin) {
      throw new Meteor.Error('no-right',
        "Vous n'avez pas les droits pour changer le nom de cette projet.");
    }

    Guilds.update(guildId, {
      $set: { name: newName }
    });
    Channels.update(guild.mainChannel, {
      $set : { name: newName }
    });
  },
  'guilds.changePicture'(url, guildId) {
    const userId = this.userId;

    if (!userId) {
      throw new Meteor.Error('not-logged-in',
        "Vous devez être connecté pour changer d'avatar.");
    }

    check(url, String);
    check(guildId, String);

    Guilds.update(guildId, {
      $set: { picture : url }
    });
  }
});
