import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import { Guilds } from '../collection.js';

Meteor.publish('guildList',function(){
  if (this.userId) {
    let user = Meteor.users.findOne(this.userId);
    return Guilds.find({_id: {$in: user.subscribedGuilds}});
  }
  return Guilds.find({});
});

Meteor.publish('guildPage',function(id){
  check(id, String);
  return Guilds.find({_id: id});
});
