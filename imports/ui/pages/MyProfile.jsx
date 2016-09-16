import React, { Component, PropTypes }  from 'react';
import { Meteor }                       from 'meteor/meteor';

import UserHeader                       from '../components/UserHeader.jsx';
import AppNav                           from '../components/AppNav.jsx';
import Breadcrumb                       from '../components/Breadcrumb.jsx';
import List                             from '../components/List';
import UpdateAvatar                     from '../components/UpdateAvatar.jsx';


export default class MyProfile extends Component {

  render() {

    const { user, guilds, channels, history } = this.props;

    return (
      <div className="screen-box">

        <Breadcrumb title="Mon profil" hasBack={false} />
        <div className="sub-container">

          <UserHeader user={user}/>
          <UpdateAvatar />
          <div className="list">
            <div className="list-sub-menu">
              <i className="big-icon icon icon-temple"/>
              <h5>Groupes dont vous faites partie</h5>
            </div>
            <List data={guilds} type="guild" user={user} />
            <div className="list-sub-menu">
              <i className="big-icon icon icon-bubble"/>
              <h5>Discussions dont vous faites partie</h5>
            </div>
            <List data={channels} type="channel" />
            <div className="list-sub-menu">
              <i className="big-icon icon icon-history"/>
              <h5>Historique des évaluations</h5>
            </div>
            <List data={history.actionHistory} type="history" />
          </div>

        </div>
        <AppNav user={user} />
      </div>
    );
  }
}
