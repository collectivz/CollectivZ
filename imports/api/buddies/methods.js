import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { _ } from 'meteor/underscore';
import { Accounts } from 'meteor/accounts-base'
import { Channels } from '../channels/collection.js';

Meteor.methods({

  'buddies.inviteToChannel'(mail, channelId) {
    check(mail, String);
    check(channelId, String);

    if (!this.userId) {
      throw new Meteor.Error('not-logged-in',
        'Vous devez être connecté pour inviter un ami.');
    }
    const friend = Accounts.findUserByEmail(mail)
    if (!friend) {
      throw new Meteor.Error('user-not-found',
        'Le mail renseigné ne correspond à aucun utilisateur.');
    }
    if (Channels.findOne(channelId)) {
      Meteor.users.update(friend,
        { $push: { subscribedChannels: channelId } },
      );
    } else {
      throw new Meteor.Error('channel-not-found',
        'Channel non trouvé.');
    }
  }
});
