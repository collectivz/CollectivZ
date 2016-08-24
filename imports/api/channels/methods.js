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
    Meteor.users.update(this.userId, {
      $push: { subscribedChannels: channelId },
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
      Meteor.users.update(this.userId, {
        $push: { subscribedChannels: channelId },
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
    const channelsConversation = Channels.find({_id: {$in: user.conversationChannels}}).fetch();
    const participant = Meteor.users.findOne({username: userInvited});
    if (participant._id === user._id) {
      if (!this.userId) {
        throw new Meteor.Error('cannot-do-that',
        "Vous ne pouvez pas créer de conversation privée avec vous même.");
      }
    }
    if (channelsConversation) {
      participant.conversationChannels.forEach((conversationId) => {
        if (_.contains(channelsConversation, conversation)) {
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
      $push: { conversationChannels: newConversationChannelId }
    });
  }
});
