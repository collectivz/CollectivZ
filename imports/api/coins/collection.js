import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

class CoinCollection extends Mongo.Collection {
  insert(coin, callback) {
    const userId = Meteor.userId();

    coin.author = userId;
    coin.totalEarned = 0;
    coin.givers = [];
    coin.createdAt = Date.now();

    return super.insert(coin);
  }
}

export const Coins = new CoinCollection('coins');

if (Meteor.isClient) {
  window.Coins = Coins;
}
