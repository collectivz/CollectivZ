import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import { Messages } from './collection.js';

Meteor.methods({
  'messages.insert'(message) {
    if (!this.userId) {
      throw new Meteor.Error('not-logged-in',
        "Vous devez être connecté pour poster un message.");
    }

    check(message, {
      text: String,
      channelId: String,
    });
    if (message.text.length > 0) {
      Messages.insert(message);
    }
  }
});
