import { Meteor } from "meteor/meteor";

import { Propositions } from "../collection.js";

Meteor.publish("propositions", pollId => Propositions.find({ pollId }));
