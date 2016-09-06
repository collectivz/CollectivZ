import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { Repertory } from '../../api/repertory/collection.js';
import { Teams } from '../../api/teams/collection.js';

import CreateGroupPage from '../pages/CreateGroupPage.jsx';

export default createContainer(({ user }) => {
  const contactSub = Meteor.subscribe('contactPage', user.repertory);
  const repertory = Repertory.findOne(user.repertory);
  let usersContact = [];
  if (repertory) {
    usersContact = Meteor.users.find(
      {_id: {$in: repertory.contacts}},
      { sort: { username: 1 } }).fetch();
  }

  return {
    repertory,
    usersContact,
    loading: !contactSub.ready(),
  };
}, CreateGroupPage);
