import React from 'react'

import ChannelItem from '../components/ChannelItem.jsx';
import AppNav from '../components/AppNav.jsx';
import TopNav from '../components/TopNav.jsx';

export default class ChannelList extends React.Component {

  render() {
    const {
      channels,
      user
    } = this.props;
    // channels.sort((a, b) => {
    //   return b.lastActivity - a.lastActivity;
    // });

    return (
      <div>
        <TopNav text={'Vos groupes de discussion'} />
        <div className="view-container">
          <div className="page-wrapper">
            <div className="scroll-content has-top-nav has-tabs-nav">
              <div className="disable-user-behavior">
                <div className="list">
                  {channels.map(function(channel) {
                     return <ChannelItem key={channel._id} channel={channel} />;
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
        <AppNav user={user}/>
      </div>
    );
  }
}
