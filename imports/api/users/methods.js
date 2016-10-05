import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import { Channels } from '../channels/collection.js';

Meteor.methods({
  'users.changeAvatar'(userId, url) {
    if (!this.userId) {
      throw new Meteor.Error('not-logged-in',
        "Vous devez être connecté pour changer d'avatar.");
    }

    check(url, String);
    check(userId, String);

    if (this.userId !== userId && !Meteor.user().isAdmin) {
      throw new Meteor.Error('wrong user',
        "Vous ne pouvez pas changer l'image d'une autre personne.");
    }

    Meteor.users.update(userId, {
      $set: { 'imageUrl' : url }
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
  },

  'users.setUsername'(newUsername) {
    if (!this.userId) {
      throw new Meteor.Error('not-logged-in',
        "Vous devez être connecté pour changer de nom d'utilisateur.");
    }
    check(newUsername, String);

    Accounts.setUsername(this.userId, newUsername);
  },

  'users.getUserNumber'() {
    return Meteor.users.find().count();
  }
});
