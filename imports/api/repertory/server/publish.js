import { Meteor } from 'meteor/meteor';

import { Repertory } from '../../repertory/collection.js';
import { Channels } from '../../channels/collection.js';

Meteor.publish('contactPage', function (repertoryId) {
  const repertory = Repertory.findOne(repertoryId);
  let userToSubscribe = [];
  if (repertory) {
    userToSubscribe = repertory.contacts.concat(repertory.invitationReceived, repertory.invitationSent, repertory.blackList);
  }

  return [
    Repertory.find({ _id: repertoryId }),
    Meteor.users.find({ _id: { $in: userToSubscribe } }),
    Channels.find({ type: 'conversation', members: { $in: [this.userId] } }),
  ];
});
