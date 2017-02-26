import { Meteor } from "meteor/meteor";
import { Mongo } from "meteor/mongo";

class ChannelCollection extends Mongo.Collection {
  insert(channel, callback) {
    const userId = Meteor.userId();

    channel.author = userId;
    channel.leaders = [userId];
    channel.createdAt = Date.now();
    channel.lastActivity = Date.now();
    channel.receivedFeedback = false;
    channel.connections = {};
    channel.isTyping = [];
    channel.objectionable = false;
    channel.mobileIds = [];

    return super.insert(channel);
  }
}

export const Channels = new ChannelCollection("channels");

if (Meteor.isClient) {
  window.Channels = Channels;
}
