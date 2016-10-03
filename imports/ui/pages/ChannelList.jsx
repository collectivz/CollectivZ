import React               from 'react'

import List                from '../components/List.jsx';
import AppNav              from '../components/AppNav.jsx';
import Breadcrumb          from '../components/Breadcrumb.jsx';
import ChannelParser       from '../components/ChannelParser';

export default class ChannelList extends React.Component {

  render() {
    const {
      channelRoots,
      conversations,
      user,
      unreadCounts
    } = this.props;

    const sortedChannels = channelRoots.sort((a, b) => {
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
              renderUnread={true}
              emptyListString={emptyListString}
              user={user}
            >
              <ChannelParser />
            </List>
          </div>
        <AppNav user={user}/>
      </div>
    );
  }
}
