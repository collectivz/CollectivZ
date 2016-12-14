import React from 'react';

import Breadcrumb from './Breadcrumb';
import List from './List';
import ChannelItem from './ChannelItem';

export default class CurrentActions extends React.Component {
  render() {
    const { actions } = this.props;
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
}
