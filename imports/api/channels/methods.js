import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { _ } from 'meteor/underscore';

import { Channels } from './collection.js';
import { Messages } from '../messages/collection.js';
import { Polls } from '../polls/collection.js';
import { Feedbacks } from '../feedbacks/collection.js';
import { Beers } from '../beers/collection.js';
import { Coins } from '../coins/collection.js';
import { Circles } from '../circles/collection.js';
import historyUserAction from '../history/functions.js';

Meteor.methods({
  'groups.insert'(group) {
    new SimpleSchema({
      name: {
        type: String
      },
      description: {
        type: String,
        optional: true
      },
      imageUrl: {
        type: String,
        optional: true
      }
    }).validate(group);

    if (!this.userId) {
      throw new Meteor.Error('not-logged-in',
        "Vous devez être connecté pour créer un groupe de discussion.");
    }

    group._id = new Mongo.ObjectID()._str;
    group.rootId = group._id;
    group.depth = 0;
    group.type = 'group';
    group.imageUrl = group.imageUrl ? group.imageUrl : '/img/icons/users.svg';

    Channels.insert(group);

    const msg = {
      text: 'Le groupe : ' + group.name + ' a été crée.',
      channelId: group._id
    };
    Messages.insert(msg);

    const lastReadField = `lastReadAt.${group._id}`;
    Meteor.users.update(this.userId, {
      $push: { subscribedChannels: group._id },
      $set: { [lastReadField]: Date.now() }
    });
  },

  'channels.insert'(channel, parentId) {
    if (!this.userId) {
      throw new Meteor.Error('not-logged-in',
        "Vous devez être connecté pour créer une action.");
    }

    check(parentId, String);
    check(channel, {
      name: String,
      description: Match.Maybe(String)
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
    channel.imageUrl = '/img/icons/cog.svg';


    const channelId = Channels.insert(channel)

    const msg = {
      text: 'le groupe : ' + channel.name + ' a été crée',
      url: channelId,
      type: 'channel',
      channelId: parentId
    };
    const messageId = Messages.insert(msg);

    Channels.update(parentId, {
      $inc: {'connections.channelCount' : 1}
    });
    Channels.update(channelId, {
      $set: { messageId: messageId }
    });

    const lastReadField = `lastReadAt.${channelId}`;
    Meteor.users.update(this.userId, {
      $push: { subscribedChannels: channelId },
      $set: { [lastReadField]: Date.now() }
    });

    return channelId;
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

      if (channel.type === 'conversation') {
        Meteor.users.update(userId, {
          $pullAll: { subscribedConversations: [channelId] }
        });
      } else {
        Meteor.users.update(userId, {
          $pullAll: { subscribedChannels: [channelId] }
        });
      }

      const username = Meteor.users.findOne(userId).username;
      const msg = {
        text: `L'utilisateur ${username} vient de quitter le groupe.`,
        channelId: channel._id
      };
      Messages.insert(msg);
    }
  },

  'channels.conversationCreate'(members, circleId) {
    if (!this.userId) {
      throw new Meteor.Error('not-logged-in',
        "Vous devez être connecté pour créer un groupe de discussion.");
    }
    members.push(this.userId);

    if (circleId) {
      const circle = Circles.findOne(circleId);
      if (circle.channel) {
        throw new Meteor.Error('already-exist',
        "Cette conversation existe deja.");
      }
    }

    const participants = Meteor.users.find({_id: {$in: members}}).fetch();
    if (participants.length !== members.length) {
      throw new Meteor.Error('user-not-found',
      "Nous n'avons pas trouvé tout les utilisateurs pour créer une conversation.");
    }

    const newConversationChannel = {
      name: "Discussion privée",
      depth: 0,
      parentId: "",
      rootId: "",
      messageId: "",
      type: 'conversation',
      imageUrl: '/img/icons/bubble.svg'
    }

    const channelId = Channels.insert(newConversationChannel);

    if (circleId) {
      Circles.update(circleId, {
        $set: {channel: channelId}
      });
    }
    const lastReadField = `lastReadAt.${channelId}`;
    Meteor.users.update({_id: {$in: members}}, {
      $push: { subscribedConversations: channelId },
      $set: { [lastReadField]: Date.now() }
    }, {multi: true});
    return channelId;
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
    if (channel.author !== this.userId && !Meteor.user().isAdmin) {
      throw new Meteor.Error('no-right', "Vous n'avez pas les droits pour faire ça.")
    }

    let modifier = {};
    _.keys(newChannel).forEach(key => {
      modifier[key] = newChannel[key];
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
    if (channel && (channel.author === this.userId || Meteor.user().isAdmin)) {
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
        if (channel.parentId) {
          Channels.update(channel.parentId, {
            $inc: { 'connections.channelCount': -1 }
          });
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
  },

  'channels.changePicture'(channelId, imageUrl) {
    if (!this.userId) {
      throw new Meteor.Error('not-logged-in',
        "Vous devez vous connecter pour modifier une image.");
    }

    check(channelId, String);
    check(imageUrl, String);

    const channel = Channels.findOne(channelId);
    const user = Meteor.user();

    if (channel.author !== user._id && !user.isAdmin) {
      throw new Meteor.Error('no-right',
        "Vous n'avez pas les droits pour faire ça.");
    }

    Channels.update(channelId, {
      $set: { imageUrl }
    });
  }
});
