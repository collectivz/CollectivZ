import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { _ } from 'meteor/underscore';

import { Feedbacks } from './collection.js';
import { Channels } from '../channels/collection.js';
import { Guilds } from '../guilds/collection.js';
import { Messages } from '../messages/collection.js';

Meteor.methods({
  'feedbacks.giveFeedback'(channelId, feedback) {
    const userId = this.userId;

    if (!userId) {
      throw new Meteor.Error('not-logged-in',
        "Vous devez être connecté pour laisser une évaluation");
    }

    check(channelId, String);
    check(feedback, Match.Where(feedback => {
      check(feedback.rating, Match.Where(rating => {
        check(rating, Number);
        if (rating >= 0 && rating < 6) {
          return true;
        }
        return false;
      }));
      check(feedback.comment, String);
      _.each(feedback.userFeedbacks, userFeedback => {
        check(userFeedback, {
          userId: String,
          rating: Match.Where(rating => {
            check(rating, Number);
            if (rating >= 0 && rating < 6) {
              return true;
            }
            return false;
          }),
          comment: String
        });
      });
      return true;
    }));

    const channel = Channels.findOne(channelId);

    if (channel) {

      const author = Meteor.user();

      if (channel.receivedFeedback) {
        throw new Meteor.Error('feedback-already-given',
          "Vous avez déjà évalué cette mission.");
      }

      const guild = Guilds.findOne({_id: channel.rootId});

      if (!guild) {
        throw new Meteor.Error('guild-not-found',
          "La communauté à laquelle appartient cette action n'a pas été trouvée.");
      }

      if (!_.contains(channel.leaders, author._id) && !_.contains(guild.leaders, author._id)) {
        throw new Meteor.Error('not-allowed',
          "Vous n'avez pas les droits pour laisser une évaluation ici.");
      }

      const message = {
        text: `Evaluation laissée par ${author.username}`,
        channelId,
        type: 'feedback'
      };
      const messageId = Messages.insert(message);
      
      feedback.channelId = channelId;
      feedback.messageId = messageId;
      feedback.username = author.username;
      feedback.author = author._id;
      const feedbackId = Feedbacks.insert(feedback);

      Messages.update(messageId, {
        $set: { feedbackId }
      });
      Channels.update(channelId, {
        $inc : { 'connections.feedbackCount': 1 },
        $set: { receivedFeedback: true }
      });
    }
  }
});
