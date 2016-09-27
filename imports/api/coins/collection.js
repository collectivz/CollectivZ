import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

import { Messages } from '../messages/collection';

class CoinCollection extends Mongo.Collection {
  insert(coin, callback) {
    const userId = Meteor.userId();

    coin.author = userId;
    coin.totalEarned = 0;
    coin.givers = [];
    coin.createdAt = Date.now();

    return super.insert(coin);
  }

  remove(selector) {
    const coins = Coins.find(selector, { fields: { _id: 1 } }).fetch();

    coins.forEach(coin => {
      Messages.remove({coinId: coin._id});
    });

    return super.remove(selector);
  }
}

export const Coins = new CoinCollection('coins');

if (Meteor.isClient) {
  window.Coins = Coins;
}
