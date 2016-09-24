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

  'users.updateLastRead'(channelId) {
    const userId = this.userId;

    if (!userId) {
      throw new Meteor.Error('not-logged-in',
        "Vous devez être connecté pour changer d'avatar.");
    }
    check(channelId, String);

    const lastReadField = `lastReadAt.${channelId}`;
    Meteor.users.update(userId, {
      $set: { [lastReadField]: Date.now() }
    });
  }
});
