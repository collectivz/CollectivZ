import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';

import UserHeader from '../components/UserHeader.jsx';
import AppNav from '../components/AppNav.jsx';
import UpdateAvatar from '../components/UpdateAvatar.jsx';
import UpdateBg from '../components/UpdateBg.jsx';
import HistoryItem from '../components/HistoryItem.jsx';
import GuildItem from '../components/GuildItem.jsx';
import ChannelItem from '../components/ChannelItem.jsx';

import './MyProfile.css';

export default class MyProfile extends Component {

  logout(e){
    e.preventDefault();
    Meteor.logout();
  }

  render() {
    const {
      user,
      guilds,
      channels,
      history
    } = this.props;

    return (
      <div className="view-container">
        <UserHeader user={user}/>
        <div className='has-user-header'>
          <UpdateAvatar />
          <UpdateBg />
          <button onClick={this.logout}>logout</button>
          <h4>Guildes dont vous faites parti</h4>
          {guilds ?
            <div>
              {guilds.map(guild => {
                return (<GuildItem guild={guild} key={guild._id}/>);
              })}
            </div>
            : ''
          }
          <h4>Discussions dont vous faites parti</h4>
          {channels ?
              <div>
                {channels.map(channel => {
                  return (<ChannelItem channel={channel} key={channel._id}/>);
                })}
              </div>
            : ''
          }
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
        <AppNav user={user} />
      </div>
      );
  }
}
