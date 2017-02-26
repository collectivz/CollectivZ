import { Meteor } from "meteor/meteor";
import { createContainer } from "meteor/react-meteor-data";

import CurrentActions from "../components/CurrentActions.jsx";

export default createContainer(
  ({ user }) => {
    const actions = Channels.find({
        _id: { $in: user.subscribedChannels },
        type: "channel"
      })
      .fetch();

    return {
      actions
    };
  },
  CurrentActions
);
