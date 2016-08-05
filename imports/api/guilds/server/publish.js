import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import { Guilds } from '../collection.js';

Meteor.publish('guildList',function(){
  if (this.userId) {
    return Guilds.find({});
  } else {
    this.ready();
  }
});

Meteor.publish('guildPage',function(id){
  check(id, String);
  return Guilds.find({_id: id});
});
