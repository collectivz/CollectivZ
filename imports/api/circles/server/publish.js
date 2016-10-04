import { Meteor } from 'meteor/meteor';

import { Repertory } from '../../repertory/collection.js';
import { Circles } from '../../circles/collection.js';

Meteor.publish('circlePage', function(repertoryId, circleId) {
  const repertory = Repertory.findOne(repertoryId);
  const circle = Circles.findOne(circleId);
  let userToSubscribe = [];

  return [
    Repertory.find({_id: repertoryId}),
    Meteor.users.find({_id: {$in: repertory.contacts}}),
    Circles.find({_id: circleId}),
  ];
});
