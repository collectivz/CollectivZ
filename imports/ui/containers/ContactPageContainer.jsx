import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { Repertory } from '../../api/repertory/collection.js';

import ContactPage from '../pages/ContactPage.jsx';

export default createContainer(({ user }) => {
  const contactSub = Meteor.subscribe('contactPage', user.repertory);
  const repertory = Repertory.findOne(user.repertory);
  let usersContact = [];
  let usersTeams = [];
  let usersInvitationReceved = [];
  let usersInvitationSend = [];
  if (repertory) {
    usersContact = Meteor.users.find(
      {_id: {$in: repertory.contacts}},
      { sort: { username: 1 } }).fetch();
    usersTeams = Meteor.users.find(
      {_id: {$in: repertory.teams}},
      { sort: { username: 1 } }).fetch();
    usersInvitationReceved = Meteor.users.find(
      {_id: {$in: repertory.invitationReceved}},
      { sort: { username: 1 } }).fetch();
  }

  return {
    repertory,
    usersContact,
    usersTeams,
    usersInvitationReceved,
    loading: !contactSub.ready(),
  };
}, ContactPage);
