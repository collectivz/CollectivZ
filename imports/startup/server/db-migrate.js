import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  const users = Meteor.users.find().fetch();

  users.forEach(user => {
    if (user.profile.avatar) {
      user.imageUrl = user.profile.avatar;
      delete user.profile.avatar;
      Meteor.users.update(user._id, user);
    }
  });
});
