import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import { Channels } from '../collection.js';
import { Messages } from '../../messages/collection.js';
import { Beers } from '../../beers/collection.js';
import { Polls, Propositions } from '../../polls/collection.js';

Meteor.publish('chanPage',function(id){
  check(id, String);
  const polls = Polls.find({channelId: id}).fetch();
  const pollsIds = [];

  polls.forEach((poll) => {
    pollsIds.push(poll._id);
  });

  return [
    Channels.find({_id: id}),
    Messages.find({channelId: id}),
    Beers.find({channelId: id}),
    Polls.find({channelId: id}),
    Propositions.find({pollId: { $in: pollsIds }}),
    Meteor.users.find({subscribedChannels: {$in: [id]}})
  ];
});

Meteor.publish('chanList',function(){
  if (this.userId) {
    let user = Meteor.users.findOne(this.userId);
    return Channels.find({_id: {$in: user.subscribedChannels}}, {$sort: { lastActivity: 1 }});
  }
  return [];
});
