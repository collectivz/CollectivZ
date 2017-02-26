import { Meteor } from "meteor/meteor";

import { Channels } from "../../channels/collection.js";
import { Messages } from "../../messages/collection.js";
import { History } from "../../history/collection.js";

Meteor.publish("adminSub", function() {
  if (this.userId) {
    if (Meteor.users.findOne(this.userId).isAdmin) {
      return Meteor.users.find({ isAdmin: true }, {
        fields: { isAdmin: 1, _id: 1, username: 1, profile: 1 }
      });
    }
  }
  this.ready();
});

Meteor.publish("user", function() {
  if (this.userId) {
    const zorro = Meteor.users.findOne({ username: "Zorro" });
    return [
      Meteor.users.find({ _id: { $in: [this.userId, zorro._id] } }, {
        fields: {
          username: 1,
          subscribedConversations: 1,
          subscribedChannels: 1,
          connections: 1,
          profile: 1,
          history: 1,
          repertory: 1,
          lastReadAt: 1,
          isAdmin: 1,
          coinz: 1,
          imageUrl: 1,
          phone: 1,
          hero: 1
        }
      }),
      History.find({ userId: this.userId })
    ];
  }
  this.ready();
});

Meteor.publish("userProfile", function(userId) {
  if (this.userId) {
    const user = Meteor.users.findOne(userId);

    return [
      Meteor.users.find(userId),
      Channels.find({ _id: { $in: user.subscribedChannels } }),
      History.find({ userId: user._id })
    ];
  }
  this.ready();
});

Meteor.publish("unread-count", function() {
  if (this.userId) {
    const self = this;
    const initializing = true;
    const user = Meteor.users.findOne(this.userId, {
      fields: {
        subscribedChannels: 1,
        subscribedConversations: 1,
        lastReadAt: 1
      }
    });
    const userChannels = user.subscribedChannels.concat(
      user.subscribedConversations
    );
    const unreadCounts = [];
    const handle = Messages.find({ channelId: { $in: userChannels } })
      .observeChanges({
        added(id, fields) {
          if (fields.createdAt > user.lastReadAt[fields.channelId]) {
            const unreadObjectIndex = unreadCounts.findIndex(doc => {
              if (doc && doc.channelId === fields.channelId) {
                return true;
              }
              return false;
            });

            if (unreadObjectIndex === -1) {
              unreadCounts.push({
                channelId: fields.channelId,
                count: 1
              });
              self.added("unread-count", fields.channelId, {
                channelId: fields.channelId,
                count: 1
              });
            } else {
              unreadCounts[unreadObjectIndex].count++;
              self.changed("unread-count", fields.channelId, {
                count: unreadCounts[unreadObjectIndex].count
              });
            }
          }
        }
      });

    self.ready();
    self.onStop(() => {
      handle.stop();
    });
  } else {
    this.ready();
  }
});
