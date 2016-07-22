import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const Channels = new Mongo.Collection('channels');

if (Meteor.isServer) {
  Meteor.startup(() => {
    if (Channels.find().count() === 0) {
      Channels.insert({
        text: 'channel1',
      });
    }
  });
}
