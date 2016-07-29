import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { _ } from 'meteor/underscore';

import { Channels } from './collection.js';

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
    if (!_.contains(parent.leaders, this.userId)) {
      throw new Meteor.Error('not-allowed-to',
        "Vous n'avez pas les droits nécessaires pour faire ça.");
    }
    channel.parentId = parent._id;

    const channelId = Channels.insert(channel)

    Channels.update(parentId, {
      $inc: {'connections.chanCount' : 1}
    });
    Meteor.users.update(this.userId, {
      $push: { subscribedChannels: channelId },
    });
  }
});
