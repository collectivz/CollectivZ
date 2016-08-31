import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import { Messages } from '../messages/collection.js';
import { Channels } from '../channels/collection.js';
import { Coins } from './collection.js';


Meteor.methods({
  'coins.insert'(message, result) {
    check(message, {
      text: String,
      channelId: String,
      type: Match.Maybe(String),
    });
    check(result, {
      purpose: String,
      goal: Number,
    });

    const parentId = message.channelId;

    if (!this.userId) {
      throw new Meteor.Error('not-logged-in',
      'Must be logged in to create a coinz.');
    } else if (message.type !== "coin") {
      throw new Meteor.Error('wrong-typed',
      'The message must be a coin message.');
    }

    const parent = Channels.findOne(parentId);
    if (!parent) {
      throw new Meteor.Error('channel-not-found',
      'The coin you tried to create doesn\'t belong to any chat.');
    }

    const messageId = Messages.insert(message);
    const newCoin = {
      purpose: message.text,
      messageId: messageId,
      finished: 0,
      channelId: message.channelId,
      goal: result.goal,
    };

    coinId = Coins.insert(newCoin);

    Messages.update(messageId, {
      $set: { coinId: coinId }
    });

    Channels.update(parentId, {
      $inc: {'connections.coinCount': 1}
    });
  }
});
