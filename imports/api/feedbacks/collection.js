import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

import logFeedbackToHistory from '../history/functions.js';

class FeedbackCollection extends Mongo.Collection {
  insert(feedback, callback) {
    feedback.createdAt = Date.now();
    feedback.objectionable = false;
    logFeedbackToHistory(feedback);
    return super.insert(feedback, callback);
  }
}

export const Feedbacks = new FeedbackCollection('feedbacks');

if (Meteor.isClient) {
  window.Feedbacks = Feedbacks;
}
