import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import { Beers } from './collection.js';


Meteor.methods({
  'beers.insert'(beer) {
    if (!this.userId) {
      throw new Meteor.Error('not-logged-in',
        "Vous devez être connecté pour créer un évènement.");
    }

    check(beer, {
      channelId: String,
      occasion: String,
      place: String,
      date: String,
    });

    Messages.insert(beer);
  }
});
