import { Meteor } from 'meteor/meteor';

import { Repertory } from '../../repertory/collection.js';
import { Teams } from '../../teams/collection.js';

Meteor.publish('teamPage', function(repertoryId, teamId) {
  const repertory = Repertory.findOne(repertoryId);
  const team = Teams.findOne(teamId);
  let userToSubscribe = [];
  if (repertory) {
    userToSubscribe = repertory.contacts.concat(team.members);
  }

  return [
    Repertory.find({_id: repertoryId}),
    Meteor.users.find({_id: {$in: userToSubscribe}}),
    Teams.find({_id: teamId}),
  ];
});
