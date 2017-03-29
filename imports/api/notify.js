import { Meteor } from 'meteor/meteor';
import OneSignalClient from 'node-onesignal';
import { _ } from 'meteor/underscore';

import { Channels } from '../api/channels/collection';

export const Notify = {}

async function publish(data, options) {
  const client = new OneSignalClient(
    process.env.ONESIGNAL_ID,
    process.env.ONESIGNAL_KEY,
  )
  const response = await client.sendNotification(data, options);

  if (response.statusCode !== 200) {
    console.log(`OneSignal request error: ${response}`)
  }
}

Notify.ids = (text, ids = []) => {
  if (process.env.NODE_ENV === 'production') {
    const option = (ids.length > 0) ?
    { include_player_ids: [ids] }
    : { included_segments: 'All' }
    publish(text, option);
  }
}

Notify.channel = (text, channelId) => {
  const userId = Meteor.userId();
  const channel = Channels.findOne(channelId)
  const users = Meteor.users.find(
    { $and: [
      {
        $or: [
          {subscribedConversations: { $in: [channelId] }},
          {subscribedChannels: { $in: [channelId] }},
        ]
      },
      { $or: [
        { 'status.online': false },
        { 'status.idle': true }
      ]},
      { _id: { $ne: userId } }
    ]
    },
    {fields: { username: 1, status: 1, _id: 1, mobileId: 1 } }
  ).fetch()
  console.log(users)
  let idsToNotify = []
  users.forEach(user => {
    if (user._id !== userId && (!user.status || !user.status.online || user.status.idle)) {
      idsToNotify.push(user.mobileId.userId)
    }
  });
  Notify.ids(text, idsToNotify);
}

Meteor.methods({
  registerUser(userId, mobileId) {
    Meteor.users.update(
        userId, {
          $set: { mobileId: mobileId },
        },
     );
  },
});
