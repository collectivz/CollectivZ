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
    let subscribedConversations = [];
    let subscribedChannels = [];
    if (user.subscribedConversations) {
      subscribedConversations = Channels.find({_id: {$in: user.subscribedConversations}});
    }
    if (user.subscribedChannels) {
      subscribedChannels = Channels.find({_id: {$in: user.subscribedChannels}});
    }
    return (
      <div>
        <TopNav text={'Vos groupes de discussion'} />
        <div className="view-container">
          <div className="page-wrapper">
            <div className="scroll-content has-top-nav has-tabs-nav">
              <div className="disable-user-behavior">
                <div>Liste de mes groupes de discussion</div>
                <div className="list">
                  {subscribedChannels.map(function(channel) {
                     return <ChannelItem key={channel._id} channel={channel} />;
                  })}
                </div>
                <div>Liste de mes conversations privées</div>
                <div className="list">
                  {subscribedConversations.map(function(channel) {
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
