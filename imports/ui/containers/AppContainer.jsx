import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { connect } from 'react-redux';

import { startRead } from '../actions/PublicProfile';
import App from '../layout/App.jsx'

// export default createContainer(() => {
//   // const userSub = Meteor.subscribe('user');
//
//   return {
//     user: Meteor.user(),
//   };
// }, App);

const dispatchAndMapAction = (dispatch) => {
  dispatch(startRead('userProfile', Meteor.userId()));
  return {};
}

const mapStateToProps = (state) => {
  return {
    user: state.collections.users ? state.collections.users[Meteor.userId()] : null,
  };
};

export default connect(mapStateToProps, dispatchAndMapAction)(App);
