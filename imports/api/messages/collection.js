import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

class messageCollection extends Mongo.Collection {
  insert(message, callback) {
    message.createdAt = new Date();
    message.author = message.type ? 'zorro' : Meteor.userId();
    return super.insert(message);
  }
}

export const Messages = new messageCollection('messages');

if (Meteor.isClient) {
  window.Messages = Messages;
}
