import { Meteor } from "meteor/meteor";
import { createContainer } from "meteor/react-meteor-data";

import { UnreadCount } from "../../api/users/client/unread-count";

import ChannelItem from "../components/ChannelItem";

export default createContainer(
  ({ data }) => {
    if (data) {
      var unread = UnreadCount.findOne({ channelId: data._id });
    }

    return {
      count: unread ? unread.count : 0
    };
  },
  ChannelItem
);
