import { Meteor } from "meteor/meteor";

import { Repertory } from "../../repertory/collection.js";
import { Circles } from "../../circles/collection.js";

Meteor.publish("circlePage", function(circleIds) {
  if (this.userId) {
    return Circles.find({ _id: { $in: circleIds } });
  }
  this.ready();
});
