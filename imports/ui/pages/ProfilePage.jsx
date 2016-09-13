import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';

import UserHeader from '../components/UserHeader.jsx';
import AppNav from '../components/AppNav.jsx';
import TopNav from '../components/TopNav.jsx';
import Loader from '../components/Loader.jsx';
import GuildItem from '../components/GuildItem.jsx';
import ChannelItem from '../components/ChannelItem.jsx';
import HistoryItem from '../components/HistoryItem.jsx';


export default class ProfilePage extends Component {

  render() {
    
    const { user, guilds, channels, currentUser, history } = this.props;

    return (
      <div className="screen-box">
        {user ?
            <div className="screen-box">

              <TopNav text="Profile"/>

              <div className="sub-container">

                <UserHeader user={user}/>

                <div className='list'>
                  
                  <div className="list-sub-menu">
                      <i className="big-icon icon icon-temple"/>
                      <h5>Projets dont {user.username} fait parti</h5>
                  </div>

                  {guilds.map(guild => {
                    return (<GuildItem guild={guild} key={guild._id}/>);
                  })}
                  
                  <div className="list-sub-menu">
                      <i className="big-icon icon icon-bubble"/>
                      <h5>Discussions dont {user.username} fait parti</h5>
                  </div>
                  {channels.map(channel => {
                    return (<ChannelItem channel={channel} key={channel._id}/>);
                  })}
                  
                  <div className="list-sub-menu">
                      <i className="big-icon icon icon-history"/>
                      <h5>Historique des évaluations</h5>
                  </div>
                  {history ?
                    <div>
                      {history.actionHistory.map((historyItem, index) => {
                        return (<HistoryItem historyItem={historyItem} key={index} />);
                      })}
                    </div>
                    : 
                    <div className="list-empty">
                      <p><i className="icon icon-sad"/> Aucune évaluation</p>
                    </div>
                  }
                </div>
              </div>
              <AppNav user={currentUser} />
            </div>
          : <Loader />
        }
      </div>
      );
  }
}
