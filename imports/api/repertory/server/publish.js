import { Meteor } from 'meteor/meteor';

import { Repertory } from '../../repertory/collection.js';
import { Circles } from '../../circles/collection.js';

Meteor.publish('contactPage', function(repertoryId) {
  const repertory = Repertory.findOne(repertoryId);
  let userToSubscribe = [];
  if (repertory) {
    userToSubscribe = repertory.contacts.concat(repertory.invitationReceved, repertory.invitationSend, repertory.blackList);
  }

  return [
    Repertory.find({_id: repertoryId}),
    Meteor.users.find({_id: {$in: userToSubscribe}}),
    Circles.find({_id: {$in: repertory.circles}}),
  ];
});
