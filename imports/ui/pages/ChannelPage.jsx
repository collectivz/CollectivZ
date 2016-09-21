import React, { Component, PropTypes }  from 'react';
import { Meteor }                       from 'meteor/meteor';

import Breadcrumb                       from '../components/Breadcrumb';
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
              <Breadcrumb title={channel.name} hasBack={true}></Breadcrumb>
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
