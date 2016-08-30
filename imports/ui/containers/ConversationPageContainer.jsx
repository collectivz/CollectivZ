import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { Channels } from '../../api/channels/collection.js';

import ConversationPage from '../pages/ConversationPage.jsx';

export default createContainer(({ params }) => {
  const id = params.conversationId;
  const channelSub = Meteor.subscribe('conversationPage', id);
  const channel = Channels.findOne(id);

  return {
    loading: !channelSub.ready(),
    channel,
  };
}, ConversationPage);
