import { createStore, applyMiddleware } from 'redux';
import PublicProfile from '../middlewares/PublicProfile'

import rootReducer from '../reducers/index';

export default function configureStore() {
  return createStore(
    rootReducer,
    {},
    applyMiddleware(PublicProfile)
  );
}
