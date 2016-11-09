import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { Repertory } from '../../api/repertory/collection.js';
import { Circles } from '../../api/circles/collection.js';
import { Channels } from '../../api/channels/collection.js';

import ContactPage from '../pages/ContactPage.jsx';

export default createContainer(({ user }) => {
  const contactSub = Meteor.subscribe('contactPage', user.repertory);
  const repertory = Repertory.findOne(user.repertory);
  const conversations = Channels.find({
    type: "conversation", members: { $in: [Meteor.userId()] }
  }).fetch();
  let usersContact = [];
  let circles = [];
  let usersInvitationReceived = [];
  let usersInvitationSent = [];
  if (repertory) {
    usersContact = Meteor.users.find(
      {_id: {$in: repertory.contacts}},
      { sort: { username: 1 } }).fetch();
    circles = Circles.find(
      {_id: {$in: repertory.circles}},
      { sort: { lastActivity:  -1 } }).fetch();
    usersInvitationReceived = Meteor.users.find(
      {_id: {$in: repertory.invitationReceived}},
      { sort: { username: 1 } }).fetch();
    usersInvitationSent = Meteor.users.find(
      { _id: { $in: repertory.invitationSent } },
      { sort: { username: 1 } }).fetch();
  }

  return {
    repertory,
    usersContact,
    conversations,
    circles,
    usersInvitationReceived,
    usersInvitationSent,
    loading: !contactSub.ready(),
  };
}, ContactPage);
