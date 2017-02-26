import { Meteor } from "meteor/meteor";
import { createContainer } from "meteor/react-meteor-data";

import AvatarRow from "../components/chat/AvatarRow.jsx";

export default createContainer(
  ({ userIds }) => {
    const avatars = [];

    if (userIds && userIds.length > 0) {
      const users = Meteor.users.find({ _id: { $in: userIds } }).fetch();
      users.forEach(user => {
        if (user.imageUrl) {
          avatars.push(user.imageUrl);
        }
      });
    }

    return {
      avatars
    };
  },
  AvatarRow
);
