import { Meteor } from "meteor/meteor";
import OneSignalClient from "node-onesignal";
import { Channels } from "../../api/channels/collection";

export function publish(data, options) {
  console.log("publish to OneSignal.");
  const client = new OneSignalClient(
    "88cf61ed-a0b2-4303-98c6-114bb0991ddb",
    "ZGUwOTU0NjEtMDJmMS00ZmY0LTgyZDAtZGY0MDZlNDE3Y2E0"
  );

  client.sendNotification(data, options);
}

function getMobileIdFromGroup(groupId) {
  check(groupId, String);
  console.log(groupId);
  const channel = Channels.findOne(groupId);
  console.log(channel);

  if (channel) {
    const mobileIds = [];

    channel.members.forEach(member => {
      const user = Meteor.users.findOne(member._id);

      if (user && userId.mobileId) {
        mobileIds.push(Meteor.users.findOne(member._id).mobileId);
      }
    });

    console.log(`getMobileIdFromGroup${mobileIds}`);
    return mobileIds;
  }
  return null;
}

Meteor.methods({
  userNotification(text, userId) {
    const message = {
      contents: { en: text },
      headings: { en: "CollectivZ" }
    };
    publish(message, { include_player_ids: userId });
  },
  usersNotificationFromChannel(text, groupId) {
    const mobileIds = getMobileIdFromGroup(groupId);
    const message = {
      contents: { en: text },
      headings: { en: "CollectivZ" }
    };
    if (mobileIds) {
      publish(message, {
        include_player_ids: mobileIds,
        small_icon: "android_mdpi"
      });
    } else {
      console.log("Aucun utilisateur abonné à ce groupe");
    }
  },
  allUsersNotification(text) {
    const message = {
      contents: { en: text },
      headings: { en: "CollectivZ" }
    };
    publish(message, { included_segments: "All" });
  }
});
