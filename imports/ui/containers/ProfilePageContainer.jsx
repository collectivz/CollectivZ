import React from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

export default createContainer(({ params }) => {
  Meteor.subscribe('userProfile', params.userId);
  return {
    user: Meteor.users.findOne(params.userId),
  };
}, ProfilePage);
