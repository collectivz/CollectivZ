import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import { Guilds } from '../../guilds/collection.js';
import { Channels } from '../collection.js';
import { Messages } from '../../messages/collection.js';
import { Beers } from '../../beers/collection.js';
import { Polls, Propositions } from '../../polls/collection.js';

Meteor.publish('chanPage', function(id){
  check(id, String);
  const channel = Channels.findOne(id);
  let guilds;
  if (channel) {
    guilds = Guilds.find({_id: channel.rootId});
  }

  return [
    Channels.find({$or :[
      {_id: id},
      {parentId: id}
    ]}),
    guilds,
    Messages.find({channelId: id}),
    Beers.find({channelId: id}),
    Polls.find({channelId: id}),
    Meteor.users.find({subscribedChannels: {$in: [id]}})
  ];
});

Meteor.publish('chanList', function(channelsIds) {
  check(channelsIds, [String]);

  if (this.userId) {
    return Channels.find({_id: {$in: channelsIds}}, {$sort: { lastActivity: 1 }});
  }
  return [];
});
