import { Meteor } from 'meteor/meteor';
import { Push } from 'meteor/raix:push';

Push.debug = true;

Push.allow({
  send(userId, notification) {
    return true; // Allow all users to send
  },
});

// Or...
Push.deny({
   send(userId, notification) {
      return false; // Allow all users to send
   }
});

Meteor.methods({
  serverNotification(text, title) {
    Push.send({
      from: 'CollectivZ Global Notification',
      title,
      text,
      badge: 12,
      query: {},
    });
  },
  userNotification(text, title, userId) {
    Push.send({
      from: 'CollectivZ User Notification',
      title,
      text,
      badge: 12,
      query: { userId },
    });
  },
  tokenNotification(title, text, token) {
    Push.send({
      from: 'CollectivZ Token Notification',
      title,
      text,
      badge: 12,
      token,
    });
  },
});
