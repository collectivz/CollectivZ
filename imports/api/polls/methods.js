import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { _ } from 'meteor/underscore';

import { Polls, Propositions } from './collection.js';
import { Messages } from '../messages/collection.js';
import { Channels } from '../channels/collection.js';

Meteor.methods({

  'polls.insert'(message, choice) {
    check(message, {                                      // verify message if he
      text: String,                                       // does contain a text, a chan and a type
      chanId: String,
      type: Match.Maybe(String)
    });


    // this part check the logged, the info entered (chanId and type)
    // and the rights
    if (!this.userId) {
      throw new Meteor.Error('not-logged-in',
      'Must be logged in to create a poll.');
    }
    else if (type !== "poll") {
      throw new Meteor.Error('not-good-type',
        'Message is wrong typed.');
    }

    const fatherChan = Channels.findOne(fatherChanId);
    if (!fatherChan) {
      throw new Meteor.Error('no-chan-defined',
      'The message don\'t belong to any chan');
    }

    const messageFatherId = Meteor.call("messages.insert", message);
    const newPoll = {
      messageFatherId: messageFatherId,
      finished: 0,
      chanId: message.chanId,
    };
    polldId = Polls.insert(newPoll);

    // there is two type of poll, one where the user enter is own prop
    // and the other at "default" where there is for and against prop
    // this build the array where the count of vote is comptabilized with the
    // corresponding prop

    if (choice) {
      choice.forEach((proposition) => {
        Meteor.call("propostions.insert", proposition, pollId);
      })
    } else {
      Meteor.call("propostions.insert", "for", pollId);
      Meteor.call("propostions.insert", "against", pollId);
    }

    Chans.update(fatherChanId, {
      $inc: ('connections.pollsCount': 1)
    });
  },

  'polls.vote'(pollId, propsId, chanId) {

    check(pollId, String);
    check(propsId, String);
    check(chanId, String);

    // this part check the logged, the info entered (chanId and type)
    // and the rights
    if (!this.userId) {
      throw new Meteor.Error('not-logged-in',
      'Must be logged in to create a poll.');
    }

    const poll = Polls.findOne(pollId);
    if(!poll) {
      throw new Meteor.Error('no-poll',
      'The poll does not exist');
    } else if (poll.finished == 1) {
      throw new Meteor.Error('poll already finished',
      'The poll is finished');
    }

    const fatherChan = Channels.findOne(chanId);
    if (!fatherChan) {
      throw new Meteor.Error('no-chan-defined',
      'The message don\'t belong to any chan');
    }

    const props = Propositions.find({pollId: pollId}).fetch();
    props.forEach((proposition) => {
      if (_.contains(proposition.voteRecevedFrom, this.userId)) {
        throw new Meteor.Error('already voted',
        'You\'ve alreday voted for this poll');
      }
    })

    Propostions.update(propsId, {
      $push: {voteRecevedFrom: this.userId},
    });
  },

  'propositions.insert'(proposition, pollId) {

    const prop = {
      name: proposition,
      voteRecevedFrom: [],
      pollId: pollId
    }

    return Props.insert(prop);
  }
})
