import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';

import UserHeader from '../components/UserHeader.jsx';
import Breadcrumb from '../components/Breadcrumb';
import AppNav from '../components/AppNav.jsx';
import Loader from '../components/Loader.jsx';
import List from '../components/List.jsx';
import GuildItem from '../components/GuildItem.jsx';
import ChannelItem from '../components/ChannelItem.jsx';
import HistoryItem from '../components/HistoryItem.jsx';


export default class ProfilePage extends Component {

  render() {

    const { user, guilds, channels, currentUser, history } = this.props;
    let actionHistory = [];

    if (history) {
      actionHistory = history.actionHistory;
    }

    return (
      <div className="screen-box">
        {user ?
            <div className="screen-box">

              <Breadcrumb title={`Profil de ${user.username}`} hasBack={true} />

              <div className="sub-container">

                <UserHeader user={user}/>

                <div className='list'>

                  <div className="list-sub-menu">
                      <i className="big-icon icon icon-temple"/>
                      <h5>Groupes dont {user.username} fait partie</h5>
                  </div>
                  <List
                    data={guilds}
                    type="guild"
                    user={user}
                    emptyListString={`${user.username} ne fait partie d'aucun groupe. Inviter le à coopérer !`}
                  >
                    <ChannelItem />
                  </List>
                  <div className="list-sub-menu">
                      <i className="big-icon icon icon-bubble"/>
                      <h5>Discussions dont {user.username} fait partie</h5>
                  </div>
                  <List
                    data={channels}
                    type="channel"
                    emptyListString={`${user.username} ne participe à aucune action.`}
                  >
                    <ChannelItem />
                  </List>
                  <div className="list-sub-menu">
                      <i className="big-icon icon icon-history"/>
                      <h5>Historique des évaluations</h5>
                  </div>
                  <List
                    data={actionHistory}
                    type="history"
                    emptyListString="Aucune évaluation."
                  >
                    <HistoryItem />
                  </List>
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
