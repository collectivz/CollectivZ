import React               from 'react'

import List                from '../components/List.jsx';
import AppNav              from '../components/AppNav.jsx';
import Breadcrumb          from '../components/Breadcrumb.jsx';
import ChannelItemContainer          from '../containers/ChannelItemContainer.jsx';

export default class ChannelList extends React.Component {

  render() {
    const {
      channels,
      conversations,
      user,
      unreadCounts
    } = this.props;

    const sortedChannels = channels.sort((a, b) => {
      return b.lastActivity - a.lastActivity;
    });
    const emptyListString = 'Aucune discussion en cours.'

    return (
      <div className="screen-box">
        <Breadcrumb title="Récent" hasBack={false} />
          <div className="sub-container">
            <List
              data={sortedChannels}
              type="channel"
              unreadCounts={unreadCounts}
              renderUnread={true}
              emptyListString={emptyListString}
            >
              <ChannelItemContainer />
            </List>
          </div>
        <AppNav user={user}/>
      </div>
    );
  }
}
