import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';

import './ProfilePage.css';
import UserHeader from '../components/UserHeader.jsx';
import AppNav from '../components/AppNav.jsx';
import Loader from '../components/Loader.jsx';
import GuildItem from '../components/GuildItem.jsx';
import ChannelItem from '../components/ChannelItem.jsx';
import HistoryItem from '../components/HistoryItem.jsx';

export default class ProfilePage extends Component {

  render() {
    const {
      user,
      guilds,
      channels,
      currentUser,
      history
    } = this.props;

    return (
      <div className="view-container">
        {user ?
          <div>
            <UserHeader user={user}/>
            <div className='has-user-header'>
              <h4>Guildes dont {user.username} fait parti</h4>
              {guilds.map(guild => {
                return (<GuildItem guild={guild} key={guild._id}/>);
              })}
              <h4>Discussions dont {user.username} fait parti</h4>
              {channels.map(channel => {
                return (<ChannelItem channel={channel} key={channel._id}/>);
              })}
              <h4>Historique des évaluations</h4>
              {history ?
                <div>
                  {history.actionHistory.map((historyItem, index) => {
                    return (<HistoryItem historyItem={historyItem} key={index} />);
                  })}
                </div>
                : ''
              }
            </div>
            <AppNav user={currentUser} />
          </div>
          : <Loader />
        }
      </div>
      );
  }
}
