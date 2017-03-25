import { Meteor } from "meteor/meteor";
import { _ } from "meteor/underscore";

import { Channels } from "../../api/channels/collection";
import { Messages } from "../../api/messages/collection";
import { Repertory } from "../../api/repertory/collection";
import { Polls, Propositions } from "../../api/polls/collection";
import { Collections } from "../../api/collection-handler";

Meteor.startup(() => {

  const channels = Channels.find().fetch();
  channels.forEach(channel => {
    if (!channel.activeUsers) {
      Channels.update(channel._id, {
        $set: { activeUsers: [] }
      })
    }
  })
});
