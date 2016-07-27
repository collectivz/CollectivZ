import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { underscore } from 'meteor/underscore';
import { Chans, Msgs, Guilds, Polls } from './collections';

Meteor.publish(null,function(){
  return Meteor.users.find({_id: this.userId}, {fields: {
    subscribedGuildes: 1,
    subscribedChannels: 1,
    connections: 1,
    profile: 1
  }})
});

Meteor.publish('guildList',function(){
  // if (this.userId) {
  //   let user = Meteor.users.findOne(this.userId);
  //   return Guilds.find({_id: {$in: user.subscribedGuildes}});
  // }
  return Guilds.find({});
});

Meteor.publish('guildPage',function(id){
  check(id, String);
  return Guilds.find({_id: id});
});

Meteor.publish('chanPage',function(id){
  check(id, String);
  return [Chans.find({_id: id}), Msgs.find({chanId: id}), Meteor.users.find({subscribedChannels: {$in: [id]}})];
});

Meteor.publish('chanList',function(){
  if (this.userId) {
    let user = Meteor.users.findOne(this.userId);
    return Chans.find({_id: {$in: user.subscribedChannels}});
  }
  return [];
});

//
// , {fields: {
//   subscribedGuildes: 1,
//   subscribedChannels: 1,
//   connections: 1,
//   profile: 1
// }}
