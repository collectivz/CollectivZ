import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { _ } from 'meteor/underscore';

import { Channels } from '../channels/collection.js';
import { Repertory } from '../repertory/collection.js';
import { Circles } from './collection.js';

Meteor.methods({
  'circles.insert': function (usersId, name) {
    const user = Meteor.user();

    if (!user) {
      throw new Meteor.Error('not-logged-in',
        'Vous devez être connecté pour créer un cercle.');
    } else if (usersId.length === 0) {
      throw new Meteor.Error('invalid-members',
        'Vous ne pouvez pas créer de cercle vide.');
    }

    const userRepertory = Repertory.findOne(user.repertory);

    usersId.forEach((userInvited) => {
      if (!_.contains(userRepertory.contacts, userInvited)) {
        throw new Meteor.Error('invalid-members',
          'Vous ne pouvez pas inviter quelqu\'un qui n\'est pas dans vos contacts.');
      }
    });

    const newCircle = {
      members: usersId,
      name,
    };

    const circleId = Circles.insert(newCircle);
    Repertory.update({ userId: user._id }, {
      $push: { circles: circleId } },
    );
  },

  'circles.remove': function (circleId) {
    check(circleId, String);

    if (!this.userId) {
      throw new Meteor.Error('not-logged-in',
        'Vous devez être connecté pour éditer un cercle.');
    }

    const circle = Circles.findOne(circleId);
    const user = Meteor.user();

    if (!circle) {
      throw new Meteor.Error('circle-not-found',
        'Cercle non trouvé.');
    } else if (circle.author !== this.userId) {
      throw new Meteor.Error('not-allowed-to',
        'Vous ne disposez pas des droits nécéssaires.');
    }

    Repertory.update({ userId: user._id }, {
      $pull: { circles: circleId },
    });
    Circles.remove(circleId);
  },

  'circles.edit': function (circleId, newMembers, newName) {
    check(circleId, String);
    check(newName, String);
    check(newMembers, [String]);

    if (!this.userId) {
      throw new Meteor.Error('not-logged-in',
        'Vous devez être connecté pour éditer un cercle.');
    }

    const circle = Circles.findOne(circleId);

    if (!circle) {
      throw new Meteor.Error('circle-not-found',
        'Cercle non trouvé.');
    } else if (circle.author !== this.userId) {
      throw new Meteor.Error('not-allowed-to',
        'Vous ne disposez pas des droits nécéssaires.');
    }

    const users = Meteor.users.find({ _id: { $in: newMembers } }).fetch();
    if (users.length !== newMembers.length) {
      throw new Meteor.Error('not-found',
        'Un des utilisateurs spécifié est introuvable');
    }

    Circles.update(circleId, {
      $set: { name: newName, members: newMembers },
    });
  },

  'circles.editPicture': function (url, circleId) {
    const userId = this.userId;

    if (!userId) {
      throw new Meteor.Error('not-logged-in',
        "Vous devez être connecté pour changer l'avatar du groupe.");
    }

    check(url, String);
    check(circleId, String);

    Circles.update(circleId, {
      $set: { picture: url },
    });
  },
});
