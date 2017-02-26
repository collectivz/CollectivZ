import React from "react";
import { Meteor } from "meteor/meteor";
import { createContainer } from "meteor/react-meteor-data";

import { Channels } from "../../api/channels/collection.js";
import { History } from "../../api/history/collection.js";

import MyProfile from "../pages/MyProfile.jsx";

export default createContainer(
  ({ user }) => {
    const userSub = Meteor.subscribe("userProfile", user._id);
    const groups = Channels.find({
        _id: { $in: user.subscribedChannels },
        type: "group"
      })
      .fetch();
    const channels = Channels.find({
        _id: { $in: user.subscribedChannels },
        type: "channel"
      })
      .fetch();
    const history = History.findOne({ userId: user._id });

    return {
      groups,
      channels,
      history
    };
  },
  MyProfile
);
