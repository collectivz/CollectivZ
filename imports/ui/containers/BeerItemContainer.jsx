import { Meteor } from "meteor/meteor";
import { createContainer } from "meteor/react-meteor-data";

import BeerItem from "../components/chat/BeerItem.jsx";

export default createContainer(
  ({ beer }) => {
    const members = Meteor.users.find({ _id: { $in: beer.members } }).fetch();

    return {
      members
    };
  },
  BeerItem
);
