import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

class ChannelCollection extends Mongo.Collection {
  insert(channel, callback) {
    channel.author = this.userId;
    channel.leaders = [this.userId];
    channel.members = [this.userId];

    return super.insert(channel);
  }
}

export const Channels = new ChannelCollection('channels');

if (Meteor.isClient) {
  window.Channels = Channels;
}
