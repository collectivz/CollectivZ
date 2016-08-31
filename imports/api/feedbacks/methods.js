import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { _ } from 'meteor/underscore';

import { Feedbacks } from './collection.js';
import { Channels } from '../channels/collection.js';
import { Messages } from '../messages/collection.js';

Meteor.methods({
  'feedbacks.giveFeedback'(channelId, rating, comment) {
    const userId = this.userId;

    if (!userId) {
      throw new Meteor.Error('not-logged-in',
        "Vous devez être connecté pour laisser une évaluation");
    }

    check(channelId, String);
    check(comment, String);
    check(rating, Number);
    check(rating, Match.Where((rating) => {
      return (rating >= 0 && rating <= 5);
    }));

    const channel = Channels.findOne(channelId);

    if (channel) {
      if (channel.status !== 'seekingFeedback') {
        throw new Meteor.Error('not-seeking-feedback',
          "Vous ne pouvez évaluer une mission en cours.");
      }

      const author = Meteor.user();
      const exists = Feedbacks.findOne({channelId, author: author._id});

      if (exists) {
        throw new Meteor.Error('feedback-already-given',
          "Vous avez déjà évalué cette mission.");
      }

      const message = {
        text: `Evaluation laissée par ${author.username}`,
        channelId,
        type: 'feedback'
      };
      const messageId = Messages.insert(message);
      const feedback = {
        username: author.username,
        messageId,
        channelId,
        rating,
        comment,
        author: author._id
      };
      const feedbackId = Feedbacks.insert(feedback);

      Messages.update(messageId, {
        $set: { feedbackId }
      });
      Channels.update(channelId, {
        $inc : { 'connections.feedbackCount': 1 }
      });
    }
  }
});
