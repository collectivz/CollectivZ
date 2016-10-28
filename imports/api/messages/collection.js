import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

import { replaceParams } from './smiley-replacer';
import { Channels } from '../channels/collection.js';

class messageCollection extends Mongo.Collection {

  insert(message, callback) {
    message.createdAt = Date.now();
    message.author = message.author ? message.author
      : Meteor.users.findOne({username: 'Zorro'})._id;

    message.authorImage = message.authorImage ? message.authorImage
      : Meteor.users.findOne({ username: 'Zorro' }).imageUrl;
    const author = Meteor.users.findOne(message.author);
    const channel = Channels.findOne(message.channelId);
    message.authorName = author.username;
    const lastMessage = {
      author: author.username,
      text: message.text
    };
    Channels.update(message.channelId, {
      $set: { lastActivity: message.createdAt, lastMessage: lastMessage },
    });
    if (channel._id !== channel.rootId) {
      Channels.update(channel.rootId, {
        $set: { lastActivity: message.createdAt }
      });
    }
    message.text = replaceParams(message.text);
    return super.insert(message);
  }

  remove(message, callback) {
    const _message = Messages.findOne(message);
    const lastMessage = {
      text: 'Message supprimé.'
    };
    const channel = Channels.findOne(_message.channelId);

    if (channel.lastMessage.text === _message.text) {
      Channels.update(_message.channelId, {
        $set: { lastMessage },
      });
    }

    return super.remove(message, callback);
  }

}

export const Messages = new messageCollection('messages');

if (Meteor.isClient) {
  window.Messages = Messages;
}
