import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { _ } from 'meteor/underscore';

import { Feedbacks } from '../feedbacks/collection.js';
import { Channels } from '../channels/collection.js';
import { Messages } from '../messages/collection.js';
import { History } from './collection.js';

export default function historyUserAction(channelId) {
  const user = Meteor.user();
  const channel = Channels.findOne(channelId);
  const feedbacks = Feedbacks.find({channelId}).fetch();
  let averageRating = 0;
  feedbacks.forEach((feedback) => {
    averageRating += feedback.rating;
  });

  averageRating = averageRating/(feedbacks.length);

  const newActionHistory = {
    channelId: channelId,
    name: channel.name,
    rating: averageRating,
    createdAt: Date.now(),
  };

  if (!user.history) {
    const newUserHistory = {
      userId: user._id,
      actionHistory: [newActionHistory],
    }
    historyId = History.insert(newUserHistory);
    Meteor.users.update(user._id, {
      $set: {history: historyId},
    });
  } else {
    History.update({userId: user._id}, {
      $push: {actionHistory: newActionHistory},
    });
  }
}
