import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

class HistoryCollection extends Mongo.Collection {
  insert(history, callback) {
    history.createdAt = Date.now();

    return super.insert(history);
  }
}

export const History = new HistoryCollection('history');

if (Meteor.isClient) {
  window.History = History;
}
