import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import PollItem from '../components/chat/PollItem.jsx';

export default createContainer(({ poll }) => {
  const propositionsSub = Meteor.subscribe('propositions', poll._id);
  const propositions = Propositions.find({ pollId: poll._id }).fetch();

  return {
    propositions,
  };
}, PollItem);
