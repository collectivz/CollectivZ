import { Meteor } from 'meteor/meteor';

import { Feedbacks } from '../feedbacks/collection.js';
import { Channels } from '../channels/collection.js';
import { History } from './collection.js';

function addFeedback(historyItem, userId) {
  const user = Meteor.users.findOne(userId);

  if (!user.history) {
    const newUserHistory = {
      userId: user._id,
      actionHistory: [historyItem],
    };
    historyId = History.insert(newUserHistory);
    Meteor.users.update(user._id, {
      $set: {history: historyId},
    });
  } else {
    History.update({userId: user._id}, {
      $push: {actionHistory: historyItem},
    });
  }
}

export default function logFeedbackToHistory(feedback) {
  const channel = Channels.findOne(feedback.channelId);

  feedback.userFeedbacks.forEach(userFeedback => {
    const historyItem = {
      name: channel.name,
      channelId: feedback.channelId,
      actionRating: feedback.rating,
      actionComment: feedback.comment,
      userRating: userFeedback.rating,
      userComment: userFeedback.comment,
      createdAt: Date.now()
    };

    addFeedback(historyItem, userFeedback.userId);
  });
}
