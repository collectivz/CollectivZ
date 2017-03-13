import { Meteor } from "meteor/meteor";
import { _ } from "meteor/underscore";

import { Channels } from "../../api/channels/collection";
import { Messages } from "../../api/messages/collection";
import { Repertory } from "../../api/repertory/collection";
import { Polls, Propositions } from "../../api/polls/collection";
import { Collections } from "../../api/collection-handler";

Meteor.startup(() => {
  const messages = Messages.find().fetch();

  messages.forEach(message => {
    if (message.type !== "message") {
      message.objectionable = false
      Messages.update(message._id, message);
    }
  });
  //
  // const users = Meteor.users.find().fetch();
  //
  // users.forEach(user => {
  //   if (!user.blockedUsers) {
  //     Meteor.users.update(user._id, { $set: { blockedUsers: [] } });
  //   }
  // });
  //
  // const groups = Channels.find({ type: "group" }).fetch();
  // groups.forEach(group => {
  //   if (!group.private) {
  //     group.private = false;
  //     Channels.update(group._id, group);
  //   }
  // });
  //
  // const channels = Channels.find().fetch();
  // channels.forEach(channel => {
  //   if (!channel.mobileIds) {
  //     channel.mobileIds = [];
  //     Channels.update(channel._id, channel);
  //   }
  // });
  //
  // _.keys(Collections).forEach(key => {
  //   const docs = Collections[key].find({ type: key }).fetch();
  //   docs.forEach(doc => {
  //     Collections[key].update(doc._id, { $set: { objectionable: false } });
  //   });
  // });
});
