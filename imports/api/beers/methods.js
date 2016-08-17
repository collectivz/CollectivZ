import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import { Beers } from './collection.js';
import { Messages } from '../messages/collection.js';
import { Channels } from '../channels/collection.js';


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

    const user = Meteor.users.findOne(this.userId);
    const message = {
      text: `${user.username} a créé l'évenement :`,
      channelId: beer.channelId,
      type: 'beer',
    };
    const messageId = Messages.insert(message);
    beer.messageId = messageId;

    const beerId = Beers.insert(beer);

    Messages.update(messageId, {
      $set: { beerId: beerId }
    });

    Channels.update(beer.channelId, {
      $inc: {'connections.beerCount': 1}
    });
  },

  'beers.join'(beerId) {
    if (!this.userId) {
      throw new Meteor.Error('not-logged-in',
        "Vous devez être connecté pour rejoindre un évènement.");
    }

    check(beerId, String);

    const beer = Beers.findOne(beerId);

    if (beer && !_.contains(beer.members, this.userId)) {
      Beers.update(beerId, {
        $push: { members: this.userId },
      });
    }
  },

  'beers.edit'(newBeer) {
    if (!this.userId) {
      throw new Meteor.Error('not-logged-in',
      "Vous devez être connecté pour rejoindre un évènement.");
    }

    check(newBeer, {
      _id: String,
      occasion: String,
      place: String,
      date: String,
    });

    const beer = Beers.findOne(newBeer._id);

    if (beer && beer.author === this.userId) {
      Beers.update(beer._id, {
        $set: {
          occasion: newBeer.occasion,
          place: newBeer.place,
          date: newBeer.date,
        }
      });
    }
  }
});
