import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { _ } from 'meteor/underscore';

import { Channels } from './collection.js';
import { Guilds } from '../guilds/collection.js';
import { Messages } from '../messages/collection.js';
import { Polls } from '../polls/collection.js';
import { Feedbacks } from '../feedbacks/collection.js';
import { Beers } from '../beers/collection.js';
import { Coins } from '../coins/collection.js';
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
    channel.type = 'channel';


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

    const lastReadField = `lastReadAt.${channelId}`;
    Meteor.users.update(this.userId, {
      $push: { subscribedChannels: channelId },
      $set: { [lastReadField]: Date.now() }
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

      const lastReadField = `lastReadAt.${channelId}`;
      Meteor.users.update(this.userId, {
        $push: { subscribedChannels: channelId },
        $set: { [lastReadField]: Date.now() }
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
      type: 'conversation'
    }

    const newConversationChannelId = Channels.insert(newConversationChannel);


    const lastReadField = `lastReadAt.${channelId}`;
    Meteor.users.update({_id: {$in: [user._id, participant._id]}}, {
      $push: { subscribedConversations: newConversationChannelId },
      $set: { [lastReadField]: Date.now() }
    }, {multi: true});
  },

  'channels.edit'(channelId, newChannel) {
    check(channelId, String);
    new SimpleSchema({
      name: {
        type: String,
        optional: true
      },
      description: {
        type: String,
        optional: true
      },
      imageUrl: {
        type: String,
        optional: true
      }
    }).validate(newChannel);

    if (!this.userId) {
      throw new Meteor.Error('not-logged-in',
        "Vous devez être connecté pour créer un groupe de discussion.");
    }

    const channel = Channels.findOne(channelId, { fields: { author: 1 } });
    if (channel.author !== this.userId) {
      throw new Meteor.Error('no-right', "Vous n'avez pas les droits pour faire ça.")
    }

    let modifier = {};
    _.keys(newChannel).forEach(key => {
      modifier.key = newChannel[key];
    });

    Channels.update(channelId, { $set: modifier });
  },

  'channels.delete'(channelId) {
    check(channelId, String);

    if (!this.userId) {
      throw new Meteor.Error('not-logged-in',
        "Vous devez être connecté pour supprimer une action.");
    }
    const hasChildren = Channels.find({parentId: channelId}).count();

    if (hasChildren) {
      throw new Meteor.Error('has-children',
        "Cette action contient des sous-actions, vous ne pouvez la supprimer.");
    }

    const channel = Channels.findOne(channelId, { fields: {
      author: 1,
      parentId: 1,
      rootId: 1,
      type: 1,
      connections: 1
    } });
    if (channel && channel.author === this.userId) {
      if (channel.type === 'channel' || channel.type === 'group') {
        const {
          pollCount,
          beerCount,
          feedbackCount,
          coinCount
        } = channel.connections;
        if (pollCount) {
          Polls.remove({channelId});
        }
        if (beerCount) {
          Beers.remove({channelId});
        }
        if (feedbackCount) {
          Feedbacks.remove({channelId});
        }
        if (coinCount) {
          Coins.remove({channelId});
        }
        if (channel.type === 'group') {
          const guild = Guilds.findOne({ mainChannel: channelId }, { fields: { _id: 1 } });
          Meteor.users.update({ subscribedChannels: { $in: [channelId] } }, {
            $pullAll: { subscribedGuilds: [guild._id] }
          });
          Guilds.remove(guild._id);
        }

        const lastReadField = `lastReadAt.${channelId}`;
        Meteor.users.update({ subscribedChannels: { $in: [channelId] } }, {
          $pullAll: { subscribedChannels: [channelId] },
          $unset: { [lastReadField]: '' }
        });
      } else if (channel.type === 'conversation') {
        const lastReadField = `lastReadAt.${channelId}`;
        Meteor.users.update({ subscribedConversations: { $in: [channelId] } }, {
          $pullAll: { subscribedConversations: [channelId] },
          $unset: { [lastReadField]: '' }
        });
      }

      Channels.remove(channelId);
    }
  }
});
