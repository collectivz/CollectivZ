import React from 'react';

import Breadcrumb from './Breadcrumb';
import List from './List';
import ChannelItem from './ChannelItem';

export default class CurrentGroups extends React.Component {
  render() {
    const {
      groups,
    } = this.props;

    return (
      <div className="sub-container">
        <Breadcrumb title="Mes groupes" hasBack />
        <List
          data={groups}
        >
          <ChannelItem />
        </List>
      </div>
    );
  }
}
