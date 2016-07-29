import { Accounts } from 'meteor/accounts-base';

Accounts.onLogin(function() {
  // updates lastLogin date on succesful login
  const lastLogin = Meteor.user().profile.lastLogin;
  if (lastLogin < new Date) {
    Meteor.users.update(Meteor.userId(), {$set: {'profile.lastLogin': new Date }})
  }
});

if (Meteor.isServer) {
  Accounts.onCreateUser(function(options, user) {
    user.profile = options.profile || {};
    user.profile.lastLogin = new Date();
    user.subscribedGuilds = [];
    user.subscribedChannels = [];
    user.connections = {};
    return user;
  });
}

if (Meteor.isClient) {
  window.Users = Meteor.users;
}
