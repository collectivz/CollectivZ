import { Meteor } from 'meteor/meteor';

import Subscriptions from '../sub-manager';
import { readSuccess } from '../actions/PublicProfile';
import * as TYPES from '../constants/constants';

export default store => next => action => {
  if (action.type === TYPES.SUBSCRIBE) {
    const { publishName, query } = action;

    Subscriptions.add(publishName, query);
  }
  return next(action);
}
