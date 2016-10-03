import { createContainer } from 'meteor/react-meteor-data';

import { Channels } from '../../api/channels/collection';

import GroupAndActions from '../components/GroupAndActions';

export default createContainer(({ group, user }) => {

  const actions = Channels.find(
    { rootId: group._id, _id: { $in: user.subscribedChannels } , _id : { $ne: group._id }},
    { sort: { lastActivity: -1 } }
  ).fetch();

  return {
    group,
    actions,
    user
  };

}, GroupAndActions);
