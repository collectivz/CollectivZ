import { Accounts } from "meteor/accounts-base";

import { Repertory } from "../repertory/collection.js";

Accounts.onLogin(() => {
  // updates lastLogin date on succesful login
  const date = Date.now();

  if (Meteor.isCordova) {
     Meteor.users.update(Meteor.userId(), {
        $set: { lastLogin: date, mobileId: window.mobileId }
     });
   }
  else
    Meteor.users.update(Meteor.userId(), {
      $set: { lastLogin: date}
    });
});

if (Meteor.isServer) {
  Accounts.onCreateUser((options, user) => {
    const newRepertory = {
      userId: user._id
    };
    if (Meteor.users.find().count() === 0) {
      user.isAdmin = true;
    }
    user.profile = options.profile || {};
    user.profile.background = "/img/ugly.jpg";
    user.imageUrl = user.imageUrl ? user.imageUrl : "/img/no-user.png";
    user.lastLogin = Date.now();
    user.subscribedChannels = [];
    user.subscribedConversations = [];
    user.connections = {};
    user.coinz = 100;
    user.history = "";
    user.lastReadAt = {};
    user.blockedUsers = [];
    user.repertory = Repertory.insert(newRepertory);
    return user;
  });
}

Meteor.users.deny({
  insert() {
    return true;
  },
  update() {
    return true;
  },
  remove() {
    return true;
  }
});

if (Meteor.isClient) {
  window.Users = Meteor.users;
}
