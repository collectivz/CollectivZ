import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

class BeerCollection extends Mongo.Collection {
  insert(beer, callback) {
    const userId = Meteor.userId();

    beer.createdAt = Date.now();
    beer.author = userId;
    beer.members = [userId];

    return super.insert(beer);
  }
}

export const Beers = new BeerCollection('beers');

if (Meteor.isClient) {
  window.Beers = Beers;
}
