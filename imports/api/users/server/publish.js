import { Meteor } from 'meteor/meteor';

Meteor.publish(null, function() {
  if (this.userId) {
    return Meteor.users.find({_id: this.userId}, {fields: {
      subscribedGuilds: 1,
      subscribedChannels: 1,
      connections: 1,
      profile: 1
    }});
  } else {
    this.ready();
  }
});
