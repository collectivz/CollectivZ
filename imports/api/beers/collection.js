import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

class BeerCollection extends Mongo.Collection {
  insert(beer, callback) {
    const user = Meteor.user();

    beer.createdAt = Date.now();
    beer.author = user._id;
    beer.authorName = user.username;
    beer.members = [user._d];

    return super.insert(beer);
  }
}

export const Beers = new BeerCollection('beers');

if (Meteor.isClient) {
  window.Beers = Beers;
}
