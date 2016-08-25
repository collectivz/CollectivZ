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
    return [
      Channels.find({$or :[
        {_id: id},
        {parentId: id}
      ]}),
      Guilds.find({_id: channel.rootId}),
      Messages.find({channelId: id}),
      Beers.find({channelId: id}),
      Polls.find({channelId: id}),
      Meteor.users.find({subscribedChannels: {$in: [id]}})
    ];
  } else {
    return [
      Channels.find({$or :[
        {_id: id},
        {parentId: id}
      ]}),
      Messages.find({channelId: id}),
      Beers.find({channelId: id}),
      Polls.find({channelId: id}),
      Meteor.users.find({subscribedChannels: {$in: [id]}})
    ];
  }

});

Meteor.publish('chanList', function(channelsIds, conversationsIds) {
  check(channelsIds, [String]);
  let allChan;
  if (conversationsIds) {
    allChan = channelsIds.concat(conversationsIds);
  } else {
    allChan = channelsIds;
  }
  console.log(allChan);
  if (this.userId) {
    return Channels.find({_id: {$in: allChan}}, {$sort: { lastActivity: 1 }});
  }
  return [];
});
