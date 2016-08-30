import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { _ } from 'meteor/underscore';

import { Channels } from '../channels/collection.js';
import { Messages } from '../messages/collection.js';

Meteor.methods({
  'feedbacks.giveFeedback'(channelId, rating, comment) {
    const userId = this.userId;

    if (!userId) {
      throw new Meteor.Error('not-logged-in',
        "Vous devez être connecté pour rejoindre un groupe de discussion.");
    }

    check(channelId, String);
    check(comment, String);
    check(rating, Match.Where((rating) => {
      return (rating >= 0 && rating <= 5);
    }));

    const channel = Channels.findOne(channelId);

    if (channel) {
      if (channel.status !== 'seekingFeedback') {
        throw new Meteor.Error('not-seeking-feedback',
          "Vous ne pouvez évaluer une mission en cours.");
      }


      const username = Meteor.user().username;
      if (_.find(channel.feedbacks, feedback => {
        if (feedback.username === username)
          return true;
        return false
      }, username)) {
        throw new Meteor.Error('feedback-already-given',
          "Vous avez déjà évalué cette mission.");
      }
      const message = {
        text: "feedback donné.",
        channelId,
        type: 'feedback'
      };
      const messageId = Messages.insert(message);
      Channels.update(channelId, {
        $push : { feedbacks: {rating, comment, messageId, username} },
        $inc : { 'connections.feedbackCount': 1 }
      });
    }
  }
});
