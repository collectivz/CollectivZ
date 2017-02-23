import { Meteor } from 'meteor/meteor';
import OneSignalClient from 'node-onesignal';

export function publish(data, options) {
  console.log('publish to OneSignal');
  const client = new OneSignalClient('88cf61ed-a0b2-4303-98c6-114bb0991ddb', 'ZGUwOTU0NjEtMDJmMS00ZmY0LTgyZDAtZGY0MDZlNDE3Y2E0');

  client.sendNotification(data, options);
}

Meteor.methods({
  channelNotification(channel, text) {
    publish(text, { included_segments: 'All' });
  },
  userNotification(text, userId) {
    publish(text, { include_player_ids: userId });
  },
});
