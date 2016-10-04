import { Meteor } from 'meteor/meteor';

import { Channels } from '../../api/channels/collection';
import { Repertory } from '../../api/repertory/collection';

Meteor.startup(() => {
  const channels = Channels.find().fetch();

  channels.forEach(channel => {
    if (channel.connections.chanCount) {
      channel.connections.channelCount = channel.connections.chanCount;
      delete channel.connections.chanCount;
      console.log(channel);
      Channels.update(channel._id, channel);
    }
  });

  const repertories = Repertory.find().fetch();

  repertories.forEach(repertory => {
    if (repertory.teams) {
      repertory.circles = repertory.teams;
      delete repertory.teams;
      console.log(repertory);
      Repertory.update(repertory._id, repertory);
    }
  });
});
