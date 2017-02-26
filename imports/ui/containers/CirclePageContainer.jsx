import { Meteor } from "meteor/meteor";
import { createContainer } from "meteor/react-meteor-data";

import { Circles } from "../../api/circles/collection";

import CirclePage from "../pages/CirclePage";

export default createContainer(
  ({ user }) => {
    const repertory = Repertory.findOne(user.repertory);
    let circles = {};
    if (repertory) {
      const circleSub = Meteor.subscribe("circlePage", repertory.circles);
      circles = Circles.find({ _id: { $in: repertory.circles } }).fetch();
    }

    return {
      circles
    };
  },
  CirclePage
);
