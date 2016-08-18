import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { _ } from 'meteor/underscore';

import { Channels } from './collection.js';
import { Messages } from '../messages/collection.js';

Meteor.methods({
  'channels.insert'(channel, parentId) {
    if (!this.userId) {
      throw new Meteor.Error('not-logged-in',
        "Vous devez être connecté pour créer un canal de discussion.");
    }


    check(parentId, String);
    check(channel, {
      name: String,
      depth: Number,
    });

    const parent = Channels.findOne(parentId);

    if (!parent) {
      throw new Meteor.Error('parent-not-found',
        "Le petit Chan a perdu ses parents, il a donc été supprimé.")
    }
    // if (!_.contains(parent.leaders, this.userId)) {
    //   throw new Meteor.Error('not-allowed-to',
    //     "Vous n'avez pas les droits nécessaires pour faire ça.");
    // }
    channel.parentId = parent._id;
    channel.rootId = parent.rootId;



    const channelId = Channels.insert(channel)

    const msg = {
      text: 'le channel : ' + channel.name + ' a été crée',
      url: channelId,
      type: 'channel',
      channelId: parentId
    };
    Messages.insert(msg);

    Channels.update(parentId, {
      $inc: {'connections.chanCount' : 1}
    });
    Meteor.users.update(this.userId, {
      $push: { subscribedChannels: channelId },
    });
  },
  'channels.join'(channelId) {
    if (!this.userId) {
      throw new Meteor.Error('not-logged-in',
        "Vous devez être connecté pour rejoindre un canal de discussion.");
    }

    check(channelId, String);

    const channel = Channels.findOne(channelId);

    if (channel && !_.contains(channel.members, this.userId)) {
      Channels.update(channelId, {
        $push: { members: this.userId },
      });
      Meteor.users.update(this.userId, {
        $push: { subscribedChannels: channelId },
      });

      const username = Meteor.users.findOne(this.userId).username;
      const msg = {
        text: `L'utilisateur ${username} vient de rejoindre le channel. Dites hola !`,
        channelId: channel._id
      };
      Messages.insert(msg);
    }
  }
});
