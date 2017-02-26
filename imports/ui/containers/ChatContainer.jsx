import { Meteor } from "meteor/meteor";
import { createContainer } from "meteor/react-meteor-data";

import { Messages } from "../../api/messages/collection.js";
import { Polls } from "../../api/polls/collection.js";
import { Beers } from "../../api/beers/collection.js";
import { Coins } from "../../api/coins/collection.js";
import { Feedbacks } from "../../api/feedbacks/collection.js";
import { Channels } from "../../api/channels/collection.js";

import Chat from "../components/chat/Chat.jsx";

export default createContainer(
  ({ channel, user }) => {
    const messages = Messages.find({ channelId: channel._id }, {
        sort: { createdAt: 1 }
      })
      .fetch();
    const polls = Polls.find({ channelId: channel._id }).fetch();
    const beers = Beers.find({ channelId: channel._id }).fetch();
    const subChannels = Channels.find({ parentId: channel._id }).fetch();
    const coins = Coins.find({ channelId: channel._id }).fetch();
    const feedbacks = Feedbacks.find({ channelId: channel._id }).fetch();

    return {
      messages,
      polls,
      beers,
      subChannels,
      coins,
      feedbacks,
      user
    };
  },
  Chat
);
