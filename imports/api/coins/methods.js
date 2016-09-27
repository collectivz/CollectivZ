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
    } else if (result.goal <= 0) {
      throw new Meteor.Error('wrong-amount',
      'Le montant donné doit etre positif');
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
  },

  'coins.donate'(coinId, money) {
    if (!this.userId) {
      throw new Meteor.Error('not-logged-in',
        "Vous devez être connecté pour rejoindre un évènement.");
    }

    check(coinId, String);
    check(money, Number);

    const user = Meteor.users.findOne(this.userId);
    if (user.coinz < money) {
      throw new Meteor.Error('not-enough-coinz',
        "Vous n'avez pas assez de coinz pour donner autant.");
    } else if (money <= 0) {
      throw new Meteor.Error('not-enough-donated',
        "Vous ne pouvez pas donner de montant négatif.");
    }

    const coin = Coins.findOne(coinId);
    let found = 0;
    if (coin.givers) {
      coin.givers.forEach((giver) => {
        if (giver.userId === this.userId) {
          giver.donated += money;
          found = 1;
        }
      });
    }
    if (found === 0) {
      newDonateMan = {
        userId: this.userId,
        donated: money,
      };
      coin.givers.push(newDonateMan);
    }
    Coins.update(coinId, {
      $set: {givers: coin.givers},
      $inc: {totalEarned: money},
    });
    Meteor.users.update(this.userId, {
      $inc: {coinz: -money},
    });
  },

  'coins.edit'(coinId, newCoin) {
    check(newCoin, {
      purpose: String,
      goal: Number
    });
    if (!this.userId) {
      throw new Meteor.Error('not-logged-in',
        "Vous devez être connecté pour rejoindre un évènement.");
    }

    const coin = Coins.findOne(coinId, { fields: { author: 1 } });

    if (coin && coin.author === this.userId || Meteor.user().isAdmin) {
      Coins.update(coinId, {
        $set : { goal: newCoin.goal, purpose: newCoin.purpose }
      });
    }
  },

  'coins.delete'(coinId) {
    if (!this.userId) {
      throw new Meteor.Error('not-logged-in',
      "vous devez être connecté pour supprimer ceci.");
    }
    check(coinId, String);

    const coin = Coins.findOne(coinId);

    if (coin && coin.author === this.userId || Meteor.user().isAdmin) {
      Coins.remove(coinId);
    }
  }
});
