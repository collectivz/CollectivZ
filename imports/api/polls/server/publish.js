import { Meteor } from 'meteor/meteor';

import { Propositions } from '../collection.js';

Meteor.publish('propositions', function(pollId) {
  return Propositions.find({pollId: pollId});
});
