import { Meteor } from 'meteor/meteor';
import OneSignalClient from 'node-onesignal';
import { _ } from 'meteor/underscore';

import { Channels } from '../api/channels/collection';

export const Notify = {}

Notify.ids = (text, ids = []) => {
  const client = new OneSignalClient(
    process.env.ONESIGNAL_ID,
    process.env.ONESIGNAL_KEY,
  )
  const option = (ids.length > 0) ?
    { include_player_ids: [ids] }
    : { included_segments: 'All' }
  client.sendNotification(text, option);
}

Notify.channel = (text, channelId) => {
  const userId = Meteor.userId();
  const channel = Channels.findOne(channelId)
  const users = Meteor.users.find(
    {$or: [
      {subscribedConversations: { $in: [channelId] }},
      {subscribedChannels: { $in: [channelId] }},
    ]},
    {fields: { username: 1, status: 1, _id: 1, mobileId: 1 } }
  ).fetch()
  let idsToNotify = []
  users.forEach(user => {
    if (user._id !== userId && (!user.status || !user.status.online)) {
      idsToNotify.push(user.mobileId.userId)
      console.log(user)
    }
  });
  this.ids(text, idsToNotify);
}

Meteor.methods({
  registerUser(userId, mobileId) {
    console.log(`mobileId is: ${JSON.stringify(mobileId)}`);
    Meteor.users.update(
        userId, {
          $set: { mobileId },
        },
     );
  },
});
