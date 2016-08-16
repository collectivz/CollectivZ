import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

class messageCollection extends Mongo.Collection {
  insert(message, callback) {
    message.createdAt = Date.now();
    message.author = message.author ? message.author
      : Meteor.users.findOne({username: 'zorro'})._id;
    return super.insert(message);
  }
}

export const Messages = new messageCollection('messages');

if (Meteor.isClient) {
  window.Messages = Messages;
}
