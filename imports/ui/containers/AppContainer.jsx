import { Meteor } from "meteor/meteor";
import { createContainer } from "meteor/react-meteor-data";

import { UnreadCount } from "../../api/users/client/unread-count.js";
import App from "../layout/App.jsx";

export default createContainer(
  () => {
    const userSub = Meteor.subscribe("user");

    return {
      loading: !userSub.ready(),
      user: Meteor.user()
    };
  },
  App
);
