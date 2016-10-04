import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

import { Messages } from '../messages/collection';

class BeerCollection extends Mongo.Collection {
  insert(beer, callback) {
    const user = Meteor.user();

    beer.createdAt = Date.now();
    beer.author = user._id;
    beer.authorName = user.username;
    beer.members = [user._id];
    beer.type = 'beer';

    return super.insert(beer);
  }

  remove(selector) {
    const beers = Beers.find(selector, { fields: { _id: 1 } }).fetch();

    beers.forEach(beer => {
      Messages.remove({beerId: beer._id});
    });

    return super.remove(selector);
  }
}

export const Beers = new BeerCollection('beers');

if (Meteor.isClient) {
  window.Beers = Beers;
}
