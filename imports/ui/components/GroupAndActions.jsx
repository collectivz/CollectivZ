import React from 'react';

import ChannelItemContainer from '../containers/ChannelItemContainer';
import List from '../components/List';

export default class GroupAndActions extends React.Component {
  render() {
    const {
      group,
      actions,
      user
    } = this.props;

    return (
      <div>
        <ChannelItemContainer data={group} renderUnread={true} />
        {
          actions.length ?
            <List
              data={actions}
              type='channel'
              emptyListString="Aucune action dans ce groupe"
              renderUnread={true}
            >
              <ChannelItemContainer />
            </List>
          : ''
        }
      </div>
    );
  }
}
