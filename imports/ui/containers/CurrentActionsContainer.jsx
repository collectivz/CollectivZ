import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { connect } from 'react-redux';

import CurrentActions from '../components/CurrentActions.jsx'

// export default createContainer(({ user }) => {
//   const actions = Channels.find({
//     _id: { $in: user.subscribedChannels },
//     type: 'channel'
//   }).fetch();
//
//   return {
//     actions,
//   };
// }, CurrentActions);



const mapStateToProps = (state) => {
  const actions = [];
  if (state.collections.channels) {
    Object.keys(state.collections.channels).forEach(_id => {
      if (state.collections.channels[_id].type === 'channel') {
        actions.push(state.collections.channels[_id]);
      }
    });
  }
  return {
    actions,
  };
};

export default connect(mapStateToProps)(CurrentActions);
