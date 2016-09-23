import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

class PollCollection extends Mongo.Collection {
  insert(poll, callback) {
    const user = Meteor.users.findOne(this.userId);

    poll.createdAt = Date.now();
    poll.author = user._id;
    poll.authorName = user.username;

    return super.insert(poll, callback);
  }

  remove(selector) {
    const polls = Polls.find(selector, { fields: { _id: 1 } }).fetch();

    polls.forEach(poll => {
      Propositions.remove({pollId: poll._id});
    });

    return super.remove(selector);
  }
}

export const Polls = new Mongo.Collection('polls');
export const Propositions = new Mongo.Collection('propositions');

if (Meteor.isClient) {
  window.Polls = Polls;
  window.Propositions = Propositions;
}
