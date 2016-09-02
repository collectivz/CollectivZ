import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { Channels } from '../../api/channels/collection.js';

import ConversationPage from '../pages/ConversationPage.jsx';

export default createContainer(({ params, user }) => {
  const id = params.conversationId;
  const channelSub = Meteor.subscribe('conversationPage', id);
  const channel = Channels.findOne(id);
  const messages = Messages.find({channelId: id}).fetch();

  return {
    loading: !channelSub.ready(),
    channel,
    messages,
    user
  };
}, ConversationPage);
