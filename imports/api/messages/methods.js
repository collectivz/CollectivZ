import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import { Messages } from './collection.js';
import { Channels } from '../channels/collection.js';


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
      message.author = this.userId;
      Messages.insert(message);
    }
  },
  'messages.edit'(newText, messageId) {
    if (!this.userId) {
      throw new Meteor.Error('not-logged-in',
        "Vous devez être connecté pour éditer un message.");
    }

    check(newText, String);
    check(messageId, String);

    const message = Messages.findOne(messageId);

    if (!message) {
      throw new Meteor.Error('message-not-found',
        "Le message à éditer n'a pas été trouvé.");
    }
    if (message.author !== this.userId && !Meteor.user().isAdmin) {
      throw new Meteor.Error('not-author',
        "Vous devez être auteur d'un message pour l'éditer.");
    }
    const channel = Channels.findOne(message.channelId);

    if (channel.lastMessage.text === message.text) {
      Channels.update(message.channelId, {
        $set: { 'lastMessage.text' : newText }
      });
    }
    Messages.update(messageId, {
      $set: { text : newText }
    });
  },
  'messages.delete'(messageId) {
    if (!this.userId) {
      throw new Meteor.Error('not-logged-in',
        "Vous devez être connecté pour supprimer un message.");
    }

    check(messageId, String);

    const message = Messages.findOne(messageId);

    if (!message) {
      throw new Meteor.Error('message-not-found',
        "Le message à supprimer n'a pas été trouvé.");
    }
    if (message.author !== this.userId && !Meteor.user().isAdmin) {
      throw new Meteor.Error('not-author',
        "Vous devez être auteur d'un message pour le supprimer.");
    }

    Messages.remove(messageId);
  }
});
