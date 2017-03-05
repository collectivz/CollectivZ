import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import { Messages } from './collection.js';
import { Channels } from '../channels/collection.js';

Meteor.methods({
  'messages.insert': function (message) {
    if (!this.userId) {
      throw new Meteor.Error(
        'not-logged-in',
        'Vous devez être connecté pour poster un message.',
      );
    }

    check(message, {
      text: String,
      channelId: String,
    });

    if (message.text.length > 0) {
      const author = Meteor.users.findOne(this.userId);
      message.author = this.userId;
      message.authorImage = author.imageUrl;
      Messages.insert(message);
    }
    const msg = `${message.text.substr(0, 120)} ...`;
    const nomGroup = $(Channels.findOne(message.channelId).name)

    Meteor.call(
        'usersNotificationFromChannel',
        `nouveau message dans le groupe`,
        message.channelId,
     );
  },
  'messages.edit': function (newText, messageId) {
    if (!this.userId) {
      throw new Meteor.Error(
        'not-logged-in',
        'Vous devez être connecté pour éditer un message.',
      );
    }

    check(newText, String);
    check(messageId, String);

    const message = Messages.findOne(messageId);

    if (!message) {
      throw new Meteor.Error(
        'message-not-found',
        "Le message à éditer n'a pas été trouvé.",
      );
    }
    if (message.author !== this.userId && !Meteor.user().isAdmin) {
      throw new Meteor.Error(
        'not-author',
        "Vous devez être auteur d'un message pour l'éditer.",
      );
    }
    const channel = Channels.findOne(message.channelId);

    if (channel.lastMessage.text === message.text) {
      Channels.update(message.channelId, {
        $set: { 'lastMessage.text': newText },
      });
    }
    Messages.update(messageId, {
      $set: { text: newText },
    });
  },
  'messages.delete': function (messageId) {
    if (!this.userId) {
      throw new Meteor.Error(
        'not-logged-in',
        'Vous devez être connecté pour supprimer un message.',
      );
    }

    check(messageId, String);

    const message = Messages.findOne(messageId);

    if (!message) {
      throw new Meteor.Error(
        'message-not-found',
        "Le message à supprimer n'a pas été trouvé.",
      );
    }
    if (message.author !== this.userId && !Meteor.user().isAdmin) {
      throw new Meteor.Error(
        'not-author',
        "Vous devez être auteur d'un message pour le supprimer.",
      );
    }

    Messages.remove(messageId);
  },

  'messages.transformIntoAction': function (messageId) {
    if (!this.userId) {
      throw new Meteor.Error(
        'not-logged-in',
        'Vous devez être connecté pour transformer un message.',
      );
    }

    check(messageId, String);

    const message = Messages.findOne(messageId);

    if (!message) {
      throw new Meteor.Error(
        'message-not-found',
        "Le message à transformer n'a pas été trouvé.",
      );
    }

    const channel = Channels.findOne(message.channelId);

    if (
      message.author !== this.userId &&
      !Meteor.user().isAdmin &&
      channel.author !== this.userId
    ) {
      throw new Meteor.Error(
        'not-author',
        "Vous devez être auteur d'un message pour le transformer.",
      );
    }

    Messages.update(message._id, {
      $set: { type: 'channel' },
    });
    const newChannel = {
      name: message.text,
      parentId: message.channelId,
      depth: channel.depth + 1,
      rootId: channel.rootId,
      type: 'channel',
      imageUrl: '/img/red_action.png',
      messageId: message._id,
    };
    const newChannelId = Channels.insert(newChannel);
    Channels.update(message.channelId, {
      $inc: { 'connections.channelCount': 1 },
    });
    let selector;
    if (message.author !== this.userId) {
      selector = { _id: { $in: [message.author, this.userId] } };
      Channels.update(newChannelId, {
        $push: { members: message.author },
      });
    } else {
      selector = this.userId;
    }

    const lastReadField = `lastReadAt.${newChannelId}`;
    Meteor.users.update(
      selector,
      {
        $push: { subscribedChannels: newChannelId },
        $set: { [lastReadField]: Date.now() },
      },
      { multi: true },
    );

    const nomGroupe = Channels.findOne(newChannelId).name;

    Meteor.call(
        'usersNotificationFromChannel',
        `nouvelle action dans le groupe`,
        newChannelId,
     );
  },

  'messages.answerMessage': function (messageId, text) {
    if (!this.userId) {
      throw new Meteor.Error(
        'not-logged-in',
        'Vous devez être connecté pour poster un message.',
      );
    }
    check(messageId, String);
    check(text, String);
    const message = Messages.findOne(messageId);

    if (!message) {
      throw new Meteor.Error(
        'not-found',
        "Le message auquel vous voulez répondre n'a pas été trouvé.",
      );
    }
    const newMessage = {
      quoted: {
        text: message.text,
        author: message.author,
        authorName: message.authorName,
      },
      text,
      channelId: message.channelId,
      author: this.userId,
      authorImage: Meteor.user().imageUrl,
    };

    Messages.insert(newMessage);

    Meteor.call(
        'usersNotificationFromChannel',
        `nouveau message dans le groupe`,
        message.channelId
    );
  },
});
