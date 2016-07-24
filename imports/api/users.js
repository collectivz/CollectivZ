Accounts.onLogin(function() {
  // updates lastLogin date on succesful login
  const lastLogin = Meteor.user().profile.lastLogin;
  if (lastLogin < new Date) {
    Meteor.users.update(Meteor.userId(), {$set: {'profile.lastLogin': new Date }})
  }
})
