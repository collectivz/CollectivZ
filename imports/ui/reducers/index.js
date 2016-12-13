import { combineReducers } from 'redux';
import publicProfile from './PublicProfile';
import collectionReducer from './meteor-data';

const rootReducer = combineReducers({
  publicProfile,
  collections: collectionReducer
});

export default rootReducer;
