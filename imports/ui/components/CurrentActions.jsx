import React from 'react';

import Breadcrumb from './Breadcrumb';
import List from './List';
import ChannelItem from './ChannelItem';

export default class CurrentActions extends React.Component {
  render() {
    const { collections } = this.props;
    if (collections.channels) {
      const actions = [];
      Object.keys(collections.channels).forEach(_id => {
        if (collections.channels[_id].type === 'channel') {
          actions.push(collections.channels[_id]);
        }
      });

      return (
        <div className="sub-container">
        <Breadcrumb title="Mes actions" hasBack={true} />
        <List
        data={actions}
        >
        <ChannelItem />
        </List>
        </div>
      );
    }
    return null;
  }
}
