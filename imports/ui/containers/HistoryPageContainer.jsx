import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { History } from '../../api/history/collection.js';
import { Feedbacks } from '../../api/feedbacks/collection.js';

import HistoryList from '../pages/HistoryList.jsx'

export default createContainer(({user}) => {
  const feedbackSub = Meteor.subscribe('historyPage');
  const history = History.findOne(user.history);
  const feedbacks = Feedbacks.find().fetch();

  return {
    loading: !feedbackSub.ready(),
    feedbacks,
    history,
    user,
  };
}, HistoryList);
