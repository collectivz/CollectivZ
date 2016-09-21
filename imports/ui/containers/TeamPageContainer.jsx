import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { Repertory } from '../../api/repertory/collection.js';
import { Teams } from '../../api/teams/collection.js';

import TeamPage from '../pages/TeamPage.jsx';

export default createContainer(({ params, user }) => {
  const teamId = params.teamId;
  const contactSub = Meteor.subscribe('teamPage', user.repertory, teamId);
  const repertory = Repertory.findOne(user.repertory);
  const team = Teams.findOne(teamId);
  let usersContact = [];
  let teamMembers = [];
  if (repertory && team) {
    usersContact = Meteor.users.find(
      {_id: {$in: repertory.contacts}},
      { sort: { username: 1 } }).fetch();
    teamMembers = Meteor.users.find(
      {_id: {$in: team.members}},
      { sort: { username: 1 } }).fetch();
    }

  return {
    repertory,
    usersContact,
    teamMembers,
    team,
    loading: !contactSub.ready(),
  };
}, TeamPage);
