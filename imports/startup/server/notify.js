import { Meteor } from 'meteor/meteor';
import OneSignalClient from 'node-onesignal';

export function publish(data, options) {
  console.log('publish to OneSignal.');
  const client = new OneSignalClient('88cf61ed-a0b2-4303-98c6-114bb0991ddb', 'ZGUwOTU0NjEtMDJmMS00ZmY0LTgyZDAtZGY0MDZlNDE3Y2E0');

  client.sendNotification(data, options);
}

Meteor.methods({
  userNotification(text, userId) {
    const message = {
      contents: { en: text },
      headings: { en: 'CollectivZ' },
    };
    publish(message, { include_player_ids: userId });
  },
  usersNotificationFromChannel(text, groupId) {
    const userIds = Meteor.channels.getMobileIdFromGroup(groupId);
    const message = {
      contents: { en: text },
      headings: { en: 'CollectivZ' },
    };
    publish(message, { include_player_ids: userIds });
  },
  allUsersNotification(text) {
    const message = {
      contents: { en: text },
      headings: { en: 'CollectivZ' },
    };
    publish(message, { included_segments: 'All' });
  },
});
