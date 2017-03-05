import { Meteor } from 'meteor/meteor';
import OneSignalClient from 'node-onesignal';
import { Channels } from '../../api/channels/collection';

async function publish(data, options) {
  console.log('publish to OneSignal.');
  const client = new OneSignalClient(
    '88cf61ed-a0b2-4303-98c6-114bb0991ddb',
    'ZGUwOTU0NjEtMDJmMS00ZmY0LTgyZDAtZGY0MDZlNDE3Y2E0',
  );

  const response = await client.sendNotification(data, options);

  if (response.statusCode !== 200) console.log(`CollectivZ: sendNotificationClient error ${response.statusCode}, options: : ${JSON.stringify(options)}`);
}

function getUsersIdFromGroup(groupId) {
  console.log('getMobileIdFromGroup: groupid = $(groupId)');
  const channel = Channels.findOne(groupId);
  console.log(channel);

  if (channel) {
    const userIds = [];

    channel.members.forEach((userId) => {
      const user = Meteor.users.findOne(userId);

      console.log(`getMobileIdFromGroup: User from group = ${JSON.stringify(user)}`);

      if (user && user.mobileId) {
        userIds.push(user.mobileId.userId);
      }
    });

    console.log(`getMobileIdFromGroup${userIds}`);
    return userIds;
  }
  return null;
}

Meteor.methods({
  userNotification(text, userId) {
    publish(text, { include_player_ids: [userId] });
  },
  usersNotificationFromChannel(text, groupId) {
    const senderId = this.userId;
    const userName = Meteor.users.findOne(senderId).username;
    let userIds = getUsersIdFromGroup(groupId);
    const message = `${userName} : ${text} dans le groupe ${Channels.findOne(groupId).name}`;

    userIds = userIds.filter(userId => (userId !== senderId));

    if (userIds) {
      publish(message, { include_player_ids: userIds });
    } else {
      console.log('Aucun utilisateur abonné à ce groupe');
    }
  },
  allUsersNotification(text) {
    publish(text, { included_segments: 'All' });
  },
  registerUser(userId, mobileId) {
    console.log(`mobileId is: ${JSON.stringify(mobileId)}`);
    Meteor.users.update(
        userId, {
          $set: { mobileId },
        },
     );
  },
});
