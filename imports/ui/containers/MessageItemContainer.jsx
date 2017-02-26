import { Meteor } from "meteor/meteor";
import { createContainer } from "meteor/react-meteor-data";

import MessageItem from "../components/chat/MessageItem";

export default createContainer(
  ({ message }) => {
    const author = Meteor.users.findOne(message.author);

    return {
      author
    };
  },
  MessageItem
);
