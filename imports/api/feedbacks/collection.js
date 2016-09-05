import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

class FeedbackCollection extends Mongo.Collection {
  insert(feedback, callback) {
    feedback.createdAt = Date.now();

    return super.insert(feedback, callback);
  }
}

export const Feedbacks = new FeedbackCollection('feedbacks');

if (Meteor.isClient) {
  window.Feedbacks = Feedbacks;
}
