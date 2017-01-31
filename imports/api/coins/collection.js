import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

import { Messages } from '../messages/collection';
import { Channels } from '../channels/collection';

class CoinCollection extends Mongo.Collection {
  insert(coin, callback) {
    const userId = Meteor.userId();

    coin.author = userId;
    coin.totalEarned = 0;
    coin.givers = [];
    coin.createdAt = Date.now();
    coin.type = 'coin';
    coin.objectionable = false;

    return super.insert(coin);
  }

  remove(selector) {
    const coins = Coins.find(selector, { fields: { _id: 1, channelId: 1 } }).fetch();

    coins.forEach((coin) => {
      Messages.remove({ coinId: coin._id });
      Channels.update({ _id: coin.channelId }, {
        $inc: { 'connections.coinCount': -1 },
      });
    });

    return super.remove(selector);
  }
}

export const Coins = new CoinCollection('coins');

if (Meteor.isClient) {
  window.Coins = Coins;
}
