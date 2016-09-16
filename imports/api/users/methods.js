import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import { Channels } from '../channels/collection.js';

Meteor.methods({
  'users.changeAvatar'(url) {
    const userId = this.userId;

    if (!userId) {
      throw new Meteor.Error('not-logged-in',
        "Vous devez être connecté pour changer d'avatar.");
    }

    check(url, String);

    Meteor.users.update(userId, {
      $set: { 'profile.avatar' : url }
    });
  },

  'users.changeBackground'(url) {
    const userId = this.userId;

    if (!userId) {
      throw new Meteor.Error('not-logged-in',
        "Vous devez être connecté pour changer d'avatar.");
    }

    check(url, String);

    Meteor.users.update(userId, {
      $set: { 'profile.background' : url }
    });
  },
  'users.markAsSeen'(channelId) {
    if (!this.userId) {
      throw new Meteor.Error('not-logged-in',
        "Vous devez être connecté pour changer d'avatar.");
    }
    check(channelId, String);

    const channel = Channels.findOne(channelId);

    if (!channel) {
      throw new Meteor.error('channel-not-found',
        "La discussion n'a pas été trouvé.");
    }
    const hasSeenFieldName = 'hasSeen.' + channel._id;

    Meteor.users.update(this.userId, {
      $set: { [hasSeenFieldName] : channel.messageCount }
    });
  }
});
