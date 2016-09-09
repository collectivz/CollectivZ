import React, { Component, PropTypes }  from 'react';
import { Meteor }                       from 'meteor/meteor';

import ChannelPageHeader                from '../components/ChannelPageHeader.jsx';
import Loader                           from '../components/Loader.jsx';
import ChatContainer                    from '../containers/ChatContainer.jsx';


export default class ChannelPage extends React.Component {

  render() {

    const { loading, channel, guild, user } = this.props;

    return (

      <div className="screen-box">
        {
          loading ?
           <Loader />
          :
            <div>
              <ChannelPageHeader channel={channel} guild={guild} />
              <ChatContainer channel={channel} user={user}/>
            </div>
        }
      </div>
    );
  }
}

ChannelPage.propTypes = {
  channel: PropTypes.object,
  guild: PropTypes.object,
};
