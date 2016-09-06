import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { _ } from 'meteor/underscore';

import { Channels } from '../channels/collection.js';
import { Repertory } from './collection.js';

Meteor.methods({
  'repertory.sendInvite'(mailOrUsername) {
    check(mailOrUsername, String);

    const user = Meteor.user();
    const userInvited = Accounts.findUserByUsername(mailOrUsername)
      || Accounts.findUserByEmail(mailOrUsername);
    if (!user) {
      throw new Meteor.Error('not-logged-in',
        'Vous devez être connecté pour ajouter un contact.');
    } else if (!userInvited) {
      throw new Meteor.Error('not-found',
        'Le mail ou le nom renseigné ne correspond à aucun utilisateur');
    }

    const userRepertory = Repertory.findOne(user.repertory);
    const userInvitedRepertory = Repertory.findOne(userInvited.repertory);

    if (_.contains(userRepertory.contacts, userInvited._id)
      || _.contains(userRepertory.invitationSend, userInvited._id)) {
      throw new Meteor.Error('already-invited',
        'Vous avez déja invité cette personne.');
    } else if (_.contains(userRepertory.invitationReceved, userInvited)) {
      throw new Meteor.Error('already-invited',
        'Cet Utilisateur vous a déjà envoyé une intitation.');
    } else if (_.contains(userInvitedRepertory, user._id)) {
      throw new Meteor.Error('blackListed',
        'Cet Utilisateur vous a bloqué.');
    }

    Repertory.update(userRepertory._id, {
      $push: { invitationSend: userInvited._id }
    });
    Repertory.update(userInvitedRepertory._id, {
      $push: { invitationReceved: user._id }
    })
  },
});
