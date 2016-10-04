import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

import { Messages } from '../messages/collection';

class PollCollection extends Mongo.Collection {
  insert(poll, callback) {
    const user = Meteor.user();

    poll.createdAt = Date.now();
    poll.author = user._id;
    poll.authorName = user.username;
    poll.type = 'poll';

    return super.insert(poll, callback);
  }

  remove(selector) {
    const polls = Polls.find(selector, { fields: { _id: 1 } }).fetch();

    polls.forEach(poll => {
      Propositions.remove({pollId: poll._id});
      Messages.remove({pollId: poll._id});
    });

    return super.remove(selector);
  }
}

export const Polls = new PollCollection('polls');
export const Propositions = new Mongo.Collection('propositions');

if (Meteor.isClient) {
  window.Polls = Polls;
  window.Propositions = Propositions;
}
