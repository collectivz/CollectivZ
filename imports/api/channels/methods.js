import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { _ } from 'meteor/underscore';

import { Channels } from './collection.js';
import { Guilds } from '../guilds/collection.js';
import { Messages } from '../messages/collection.js';
import historyUserAction from '../history/functions.js';

Meteor.methods({
  'channels.insert'(channel, parentId) {
    if (!this.userId) {
      throw new Meteor.Error('not-logged-in',
        "Vous devez être connecté pour créer un canal de discussion.");
    }

    check(parentId, String);
    check(channel, {
      name: String,
    });

    const parent = Channels.findOne(parentId);

    if (!parent) {
      throw new Meteor.Error('parent-not-found',
        "Le petit Chan a perdu ses parents, il a donc été supprimé.")
    }
    channel.parentId = parent._id;
    channel.depth = parent.depth + 1;
    channel.rootId = parent.rootId;


    const channelId = Channels.insert(channel)

    const msg = {
      text: 'le groupe : ' + channel.name + ' a été crée',
      url: channelId,
      type: 'channel',
      channelId: parentId
    };
    const messageId = Messages.insert(msg);

    Channels.update(parentId, {
      $inc: {'connections.chanCount' : 1}
    });
    Channels.update(channelId, {
      $set: { messageId: messageId }
    });
    const hasSeenFieldName = 'hasSeen.' + channel._id;
    Meteor.users.update(this.userId, {
      $push: { subscribedChannels: channelId },
      $set: { [hasSeenFieldName]: channel.messageCount }
    });
  },

  'channels.join'(channelId) {
    if (!this.userId) {
      throw new Meteor.Error('not-logged-in',
        "Vous devez être connecté pour rejoindre un groupe de discussion.");
    }

    check(channelId, String);

    const channel = Channels.findOne(channelId);

    if (channel && !_.contains(channel.members, this.userId)) {
      Channels.update(channelId, {
        $push: { members: this.userId },
      });

      const hasSeenFieldName = 'hasSeen.' + channel._id;
      Meteor.users.update(this.userId, {
        $push: { subscribedChannels: channelId },
        $set: { [hasSeenFieldName]: channel.messageCount }
      });

      const username = Meteor.users.findOne(this.userId).username;
      const msg = {
        text: `L'utilisateur ${username} vient de rejoindre le groupe. Dites hola !`,
        channelId: channel._id
      };
      Messages.insert(msg);
    }
  },

  'channels.leave'(channelId) {
    const userId = this.userId;

    if (!userId) {
      throw new Meteor.Error('not-logged-in',
        "Vous devez être connecté pour rejoindre un groupe de discussion.");
    }

    check(channelId, String);

    const channel = Channels.findOne(channelId);

    if (channel && _.contains(channel.members, userId)) {
      Channels.update(channelId, {
        $pullAll: { members: [userId] }
      });
      Meteor.users.update(userId, {
        $pullAll: { subscribedChannels: [channelId] }
      });

      const username = Meteor.users.findOne(userId).username;
      const msg = {
        text: `L'utilisateur ${username} vient de quitter le groupe.`,
        channelId: channel._id
      };
      Messages.insert(msg);
    }
  },

  'channels.conversationCreate'(userInvited) {
    if (!this.userId) {
      throw new Meteor.Error('not-logged-in',
        "Vous devez être connecté pour créer un groupe de discussion.");
    }
    const user = Meteor.user();
    let conversationUser = user.subscribedConversations;
    const participant = Meteor.users.findOne({username: userInvited});
    if (!participant) {
      throw new Meteor.Error('user-not-found',
      "Nous n'avons pas trouvé d'utilisateur ayant ce nom.");
    }
    if (participant._id === user._id) {
      if (!this.userId) {
        throw new Meteor.Error('cannot-do-that',
        "Vous ne pouvez pas créer de conversation privée avec vous même.");
      }
    }
    if (conversationUser) {
      participant.subscribedConversations.forEach((conversationId) => {
        if (_.contains(conversationUser, conversationId)) {
          throw new Meteor.Error('chan-alreay-exist',
          "Cette conversation existe deja");
        }
      });
    }
    const newConversationChannel = {
      name: "Discussion privée",
      depth: 0,
      parentId: "",
      rootId: "",
      messageId: "",
    }

    const newConversationChannelId = Channels.insert(newConversationChannel);
    Meteor.users.update({_id: {$in: [user._id, participant._id]}}, {
      $push: { subscribedConversations: newConversationChannelId }
    }, {multi: true});
  }
});
