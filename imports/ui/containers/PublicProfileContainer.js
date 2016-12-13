import React from 'react';
import { connect } from 'react-redux';

import * as PublicProfileActions from '../actions/PublicProfile';
import ProfilePage from '../pages/ProfilePage';

// class PublicProfileContainer extends React.Component {
//
//   constructor(props) {
//     super(props);
//
//     PublicProfileActions.read(Meteor.userId());
//   }
//
//   render() {
//     const {
//       ...props
//     } = this.props;
//
//     return <ProfilePage props={props} />;
//   }
// }

// PublicProfileContainer.propTypes = {
//   user: React.PropTypes.object
// };
//
// const mapDispatchToProps = (dispatch) => ({
//   PublicProfileActions: bindActionCreators(PublicProfileActions, dispatch)
// });

// const dispatchAndMapAction = (dispatch) => {
//   dispatch(PublicProfileActions.startRead(Meteor.userId()));
//   return {};
// }
//
// const mapStateToProps = (state) => ({
//   user: state.collections.users ? state.collections.users[Meteor.userId()] : null
// });
//
// export default connect(mapStateToProps, dispatchAndMapAction)(ProfilePage);
