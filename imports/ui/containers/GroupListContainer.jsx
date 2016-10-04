import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { Channels } from '../../api/channels/collection.js';

import GroupList from '../pages/GroupList.jsx';

export default createContainer(() => {
  const groupSub = Meteor.subscribe('groupList');
  const groups = Channels.find({ type: 'group' }, { sort: { name: 1 } }).fetch();

  return {
    loading: !groupSub.ready(),
    groups,
  };
}, GroupList);
