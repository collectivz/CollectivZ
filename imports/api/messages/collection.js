import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

import { Channels } from '../channels/collection.js';

class messageCollection extends Mongo.Collection {
  insert(message, callback) {
    message.createdAt = Date.now();
    message.author = message.author ? message.author
      : Meteor.users.findOne({username: 'zorro'})._id;

    const author = Meteor.users.findOne(message.author);
    message.authorName = author.username;
    const lastMessage = {
      author: author.username,
      text: message.text
    };
    Channels.update(message.channelId, {
      $set: { lastActivity: message.createdAt, lastMessage: lastMessage }
    });
    return super.insert(message);
  }
}

export const Messages = new messageCollection('messages');

if (Meteor.isClient) {
  window.Messages = Messages;
}
