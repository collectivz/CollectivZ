import { Meteor } from "meteor/meteor";

import * as TYPES from "../constants/constants";

export default store => next => action => {
  if (action.type === TYPES.USERPROFILE) {
    Meteor.subscribe("userProfile", action.userId);
    const user = Meteor.users.findOne(action.userId);
    store.dispatch(readSuccess(user));
  }
};
