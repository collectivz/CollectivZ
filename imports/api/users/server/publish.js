import { Meteor } from 'meteor/meteor';

Meteor.publish(null, function() {
  if (this.userId) {
    let zorro = Meteor.users.findOne({username: 'zorro'});
    return Meteor.users.find({_id: { $in: [ this.userId,  zorro._id ] }}, {fields: {
      username: 1,
      subscribedGuilds: 1,
      subscribedChannels: 1,
      connections: 1,
      profile: 1
    }});
  } else {
    this.ready();
  }
});
