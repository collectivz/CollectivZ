import { Meteor } from 'meteor/meteor';

import { Feedbacks } from '../../feedbacks/collection.js';
import { History } from '../collection.js';

Meteor.publish('historyPage', function(){
  const user = Meteor.users.findOne(this.userId);
  const history = History.findOne(user.history);
  let arrayChannelForFeedback = [];
  history.actionHistory.forEach((historyItem) => {
    arrayChannelForFeedback.push(historyItem.channelId);
  });


  return [
    History.find({_id: user.history}),
    Feedbacks.find({channelId: {$in: arrayChannelForFeedback}}),
  ];
});
