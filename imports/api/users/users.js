import { Accounts } from 'meteor/accounts-base';

Accounts.onLogin(function() {
  // updates lastLogin date on succesful login
  const lastLogin = Meteor.user().profile.lastLogin;
  const date = Date.now();

  if (lastLogin < date) {
    Meteor.users.update(Meteor.userId(), {$set: {'profile.lastLogin': date }})
  }
});

if (Meteor.isServer) {
  Accounts.onCreateUser(function(options, user) {
    user.profile = options.profile || {};
    user.profile.lastLogin = Date.now();
    user.subscribedGuilds = [];
    user.subscribedChannels = [];
    user.subscribedConversations = [];
    user.connections = {};
    return user;
  });
}

if (Meteor.isClient) {
  window.Users = Meteor.users;
}
