import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

class ChannelCollection extends Mongo.Collection {
  insert(channel, callback) {
    const userId = Meteor.userId();

    channel.author = userId;
    channel.leaders = [userId];
    channel.members = [userId];
    channel.workers = [];
    channel.reward = {
      experience: 0,
      points: 0
    };
    channel.createdAt = Date.now();
    channel.lastActivity = Date.now();

    return super.insert(channel);
  }
}

export const Channels = new ChannelCollection('channels');

if (Meteor.isClient) {
  window.Channels = Channels;
}
