import { Meteor } from "meteor/meteor";
import { createContainer } from "meteor/react-meteor-data";

import CurrentGroups from "../components/CurrentGroups.jsx";

export default createContainer(
  ({ user }) => {
    const groups = Channels.find({
        _id: { $in: user.subscribedChannels },
        type: "group"
      })
      .fetch();

    return {
      groups
    };
  },
  CurrentGroups
);
