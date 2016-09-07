import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { _ } from 'meteor/underscore';

import { Channels } from '../channels/collection.js';
import { Repertory } from '../repertory/collection.js';
import { Teams } from './collection.js';

Meteor.methods({
  'teams.insert'(usersId) {
    const user = Meteor.user();

    if (!user) {
      throw new Meteor.Error('not-logged-in',
        'Vous devez être connecté pour créer une équipe.');
    } else if (usersId.length === 0) {
      throw new Meteor.Error('invalid-members',
        'Vous ne pouvez pas créer d\équipe vide.');
    }

    const userRepertory = Repertory.findOne(user.repertory);

    usersId.forEach((userInvited) => {
      if (!_.contains(userRepertory.contacts, userInvited)) {
        throw new Meteor.Error('invalid-members',
          'Vous ne pouvez pas inviter quelqu\'un qui n\'est pas dans vos contacts.');
      }
    });

    const newTeam = {
      members: usersId,
    };
    const teamId = Teams.insert(newTeam);
    Repertory.update({userId: {$in: usersId}}, {
      $push: { teams: teamId}},
      {multi: true}
    );
  },
});
