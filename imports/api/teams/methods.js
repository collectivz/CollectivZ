import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { _ } from 'meteor/underscore';

import { Channels } from '../channels/collection.js';
import { Repertory } from '../repertory/collection.js';
import { Teams } from './collection.js';

Meteor.methods({
  'teams.insert'(usersId, name) {
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
      name: name,
    };

    const teamId = Teams.insert(newTeam);
    Repertory.update({userId: user._id}, {
      $push: { teams: teamId}}
    );
  },

  'teams.remove'(teamId) {
    check(teamId, String);

    if (!this.userId) {
      throw new Meteor.Error('not-logged-in',
        'Vous devez être connecté pour éditer une equipe.');
    }

    const team = Teams.findOne(teamId);
    const user = Meteor.user();

    if (!team) {
      throw new Meteor.Error('team-not-found',
        'Equipe non trouvé.');
    } else if (team.author !== this.userId) {
      throw new Meteor.Error('not-allowed-to',
        'Vous ne disposez pas des droits nécéssaires.');
    }

    Repertory.update({userId: user._id}, {
      $pull: {teams: teamId}
    });
    Teams.remove(teamId);
  },

  'teams.editName'(teamId, newName) {

    check(teamId, String);
    check(newName, String);

    if (!this.userId) {
      throw new Meteor.Error('not-logged-in',
        'Vous devez être connecté pour éditer une equipe.');
    }

    const team = Teams.findOne(teamId);

    if (!team) {
      throw new Meteor.Error('team-not-found',
        'Equipe non trouvé.');
    } else if (team.author !== this.userId) {
      throw new Meteor.Error('not-allowed-to',
        'Vous ne disposez pas des droits nécéssaires.');
    }

    Teams.update(teamId, {
      $set: {name: newName}
    });
  },

  'teams.editPicture'(url, teamId) {
    const userId = this.userId;

    if (!userId) {
      throw new Meteor.Error('not-logged-in',
        "Vous devez être connecté pour changer l'avatar du groupe.");
    }

    check(url, String);
    check(teamId, String);

    Teams.update(teamId, {
      $set: { picture : url }
    });
  },

  'teams.changeMembers'(teamId, newSetOfMembers) {
    const team = Teams.findOne(teamId);

    if (!this.userId) {
      throw new Meteor.Error('not-logged-in',
        "Vous devez être connecté pour modifier vos cercles.");
    }

    if (!team) {
      throw new Meteor.Error('team-not-found',
        "Le cercle spécifié est introuvable.");
    }

    if (team.author !== this.userId) {
      throw new Meteor.Error('not-allowed-to',
        "Vous n'avez pas les droits pour faire ceci.");
    }

    users = Meteor.users.find({_id: {$in: newSetOfMembers}}).fetch();
    if (users.length !== newSetOfMembers.length) {
      throw new Meteor.Error('not-found',
        "Un des utilisateurs spécifié est intrvouvable");
    }

    Teams.update(teamId, {
      $set: {members: newSetOfMembers}
    });
  }
});
