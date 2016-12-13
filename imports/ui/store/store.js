import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';

import { createStore, applyMiddleware, compose } from 'redux';
import PublicProfile from '../middlewares/PublicProfile'

import rootReducer from '../reducers/index';

// export default function configureStore() {
const enhancer = compose(applyMiddleware(PublicProfile));
export default Store = createStore(
  rootReducer,
  {},
  enhancer
);
