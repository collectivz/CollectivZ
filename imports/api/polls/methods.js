import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Push } from 'meteor/raix:push';
import { _ } from 'meteor/underscore';

import { Polls, Propositions } from './collection.js';
import { Messages } from '../messages/collection.js';
import { Channels } from '../channels/collection.js';

Meteor.methods({

  'polls.insert': function (message, choice) {
    check(message, {                                      // verify message if he
      text: String,                                       // does contain a text, a chan and a type
      channelId: String,
      type: Match.Maybe(String),
    });

    const parentId = message.channelId;


    // this part check the logged, the info entered (channelId and type)
    // and the rights
    if (!this.userId) {
      throw new Meteor.Error('not-logged-in',
      'Must be logged in to create a poll.');
    } else if (message.type !== 'poll') {
      throw new Meteor.Error('not-good-type',
        'Message is wrong typed.');
    }


    const parent = Channels.findOne(parentId);
    if (!parent) {
      throw new Meteor.Error('no-chan-defined',
      'The message don\'t belong to any chan');
    }

    const messageId = Messages.insert(message);
    const newPoll = {
      question: message.text,
      messageId,
      finished: 0,
      channelId: message.channelId,
      totalVote: 0,
    };
    const pollId = Polls.insert(newPoll);

    // there is two type of poll, one where the user enter is own prop
    // and the other at "default" where there is for and against prop
    // this build the array where the count of vote is comptabilized with the
    // corresponding prop

    Messages.update(messageId, {
      $set: { pollId },
    });

    if (choice.length) {
      choice.forEach((proposition) => {
        Meteor.call('propositions.insert', proposition, pollId);
      });
    } else {
      Meteor.call('propositions.insert', 'pour', pollId);
      Meteor.call('propositions.insert', 'contre', pollId);
    }

    Channels.update(parentId, {
      $inc: { 'connections.pollCount': 1 },
    });

     Push.send({
        from: 'CollectivZ Token Notification',
        title: 'CollectivZ News',
        text: 'Nouveau Sondage',
        badge: 12,
        query: {},
     });
//    Meteor.call('serverNotification', 'Nouveau Sondage', 'CollectivZ News');
  },

  'polls.vote': function (pollId, propsId) {
    check(pollId, String);
    check(propsId, String);

    // this part check the logged, the info entered (channelId and type)
    // and the rights
    if (!this.userId) {
      throw new Meteor.Error('not-logged-in',
      'Must be logged in to create a poll.');
    }

    const poll = Polls.findOne(pollId);
    if (!poll) {
      throw new Meteor.Error('no-poll',
      'The poll does not exist');
    } else if (poll.finished === 1) {
      throw new Meteor.Error('poll already finished',
      'The poll is finished');
    }

    const props = Propositions.find({ pollId }).fetch();
    props.forEach((proposition) => {
      if (_.contains(proposition.voteReceivedFrom, this.userId)) {
        throw new Meteor.Error('already voted',
        'You\'ve alreday voted for this poll');
      }
    });

    Propositions.update(propsId, {
      $push: { voteReceivedFrom: this.userId },
    });
    Polls.update(pollId, {
      $inc: { totalVote: 1 },
      $push: { members: this.userId },
    });
  },

  'propositions.insert': function (proposition, pollId) {
    const prop = {
      name: proposition,
      voteReceivedFrom: [],
      pollId,
    };

    return Propositions.insert(prop);
  },

  'polls.editQuestion': function (pollId, newQuestion) {
    if (!this.userId) {
      throw new Meteor.Error('not-logged-in',
      'Vous devez être connecté pour modifier un sondage.');
    }
    check(pollId, String);
    check(newQuestion, String);

    const poll = Polls.findOne(pollId);

    if (poll && poll.author === this.userId || Meteor.user().isAdmin) {
      Polls.update(pollId, { $set: { question: newQuestion } });
    }
  },

  'polls.addProposition': function (pollId, newProp) {
    if (!this.userId) {
      throw new Meteor.Error('not-logged-in',
      'Vous devez être connecté pour modifier un sondage.');
    }
    check(pollId, String);
    check(newProp, String);

    const poll = Polls.findOne(pollId, { fields: { author: 1 } });

    if (poll && poll.author === this.userId || Meteor.user().isAdmin) {
      const proposition = {
        name: newProp,
        voteReceivedFrom: [],
        pollId,
      };
      Propositions.insert(proposition);
    }
  },

  'polls.delete': function (pollId) {
    if (!this.userId) {
      throw new Meteor.Error('not-logged-in',
      'Vous devez être connecté pour modifier un sondage.');
    }
    check(pollId, String);

    const poll = Polls.findOne(pollId, { fields: { author: 1 } });

    if (poll && poll.author === this.userId || Meteor.user().isAdmin) {
      Polls.remove(pollId);
    }
  },
});
