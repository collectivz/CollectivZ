Push.debug = true;

Push.allow({
  send(userId, notification) {
    return true; // Allow all users to send
  },
});

Meteor.methods({
  serverNotification(text, title) {
    Push.send({
      from: 'CollectivZ Notification',
      title,
      text,
      badge: 12,
      query: {},
    });
  },
  userNotification(text, title, userId) {
    Push.send({
      from: 'CollectivZ Notification',
      title,
      text,
      badge: 12,
      query: { userId },
    });
  },
});
