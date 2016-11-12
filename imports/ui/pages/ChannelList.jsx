import React               from 'react'

import List                from '../components/List.jsx';
import AppNav              from '../components/AppNav.jsx';
import Breadcrumb          from '../components/Breadcrumb.jsx';
import ChannelParser       from '../components/ChannelParser';

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
            <div className="list-sub-menu small">
                <i className="big-icon icon icon-users"/>
                <h5>Groupes({channels.length})</h5>
            </div>
            <List
              data={sortedChannels}
              type="channel"
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
