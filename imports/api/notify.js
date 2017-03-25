import { Meteor } from 'meteor/meteor';
import OneSignalClient from 'node-onesignal';
import { Channels } from '../api/channels/collection';

const client = new OneSignalClient(
  '88cf61ed-a0b2-4303-98c6-114bb0991ddb',
  'ZGUwOTU0NjEtMDJmMS00ZmY0LTgyZDAtZGY0MDZlNDE3Y2E0',
  // process.env.ONESIGNAL_ID,
  // process.env.ONESIGNAL_KEY,
)

export const Notify = {}

Notify.ids = (text, ids = []) => {
  const option = (ids.length > 0)
    ? { include_player_ids: [ids] }
    : { included_segments: 'All' }
  client.sendNotification(text, option);
}

Notify.channel = (text, channelId) => {
  const userId = Meteor.userId();
  const users = Meteor.users.find(
    { $or: [
      {subscribedConversations: { $in: [channelId] }},
      {subscribedChannels: { $in: [channelId] }},
    ] },
    {fields: { _id: 1, mobileId: 1 } }
  ).fetch()
  let idsToNotify = []
  users.forEach(user => {
    if (user._id !== userId) {
      idsToNotify.push(user.mobileId.userId)
    }
  });
  client.sendNotification(text, { include_player_ids: idsToNotify });
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
