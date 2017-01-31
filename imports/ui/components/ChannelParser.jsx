import React from 'react';

import GroupAndActionsContainer from '../containers/GroupAndActionsContainer';
import ChannelItemContainer from '../containers/ChannelItemContainer';

export default class ChannelParser extends React.Component {
  render() {
    const {
      data,
      user,
    } = this.props;

    return (
      data.type === 'group' ?
        <GroupAndActionsContainer group={data} user={user} />
      :
        <ChannelItemContainer data={data} user={user} renderUnread renderMargin={false} />
    );
  }
}
