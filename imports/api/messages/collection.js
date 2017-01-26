import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

import { replaceSmileys } from './smiley-replacer';
import { replaceUrls } from './url-handler';
import { Channels } from '../channels/collection';

class messageCollection extends Mongo.Collection {

  insert(message, callback) {
    message.createdAt = Date.now();
    message.author = message.author ? message.author
      : Meteor.users.findOne({ username: 'Zorro' })._id;

    message.authorImage = message.authorImage ? message.authorImage
      : Meteor.users.findOne({ username: 'Zorro' }).imageUrl;
    const author = Meteor.users.findOne(message.author);
    const channel = Channels.findOne(message.channelId);
    message.authorName = author.username;
    const lastMessage = {
      author: author.username,
      text: message.text,
    };
    Channels.update(message.channelId, {
      $set: { lastActivity: message.createdAt, lastMessage },
    });
    message.text = replaceSmileys(message.text);
    message.text = replaceUrls(message.text);
    return super.insert(message);
  }

  remove(message, callback) {
    const _message = Messages.findOne(message);
    const lastMessage = {
      text: 'Message supprimé.',
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
