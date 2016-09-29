import React, { Component, PropTypes }  from 'react';
import { Meteor }                       from 'meteor/meteor';

import UserHeader                       from '../components/UserHeader.jsx';
import ChannelItem                       from '../components/ChannelItem.jsx';
import HistoryItem                       from '../components/HistoryItem.jsx';
import AppNav                           from '../components/AppNav.jsx';
import Breadcrumb                       from '../components/Breadcrumb.jsx';
import List                             from '../components/List';
import UpdateAvatar                     from '../components/UpdateAvatar.jsx';
import PasswordEdit                    from '../components/PasswordEdit.jsx';
import UsernameEdit                    from '../components/UsernameEdit.jsx';
import { openModal }                    from '../helpers/Modal.js';

export default class MyProfile extends Component {

  constructor(props) {
    super(props);

    this.openPasswordModal = this.openPasswordModal.bind(this);
    this.openUsernameModal = this.openUsernameModal.bind(this);
  }

  openPasswordModal() {
    const component = <PasswordEdit />;
    openModal(component, "Modifier le mot de passe");
  }

  openUsernameModal() {
    const {
      user
    } = this.props;
    const component = <UsernameEdit user={user}/>;
    openModal(component, "Modifier votre nom d'utilisateur");
  }

  render() {

    const { user, guilds, channels, history } = this.props;
    let actionHistory = [];

    if (history) {
      actionHistory = history.actionHistory;
    }

    return (
      <div className="screen-box">

        <Breadcrumb title="Mon profil" hasBack={false} />
        <div className="sub-container">

          <UserHeader user={user}/>
          <button className="button big" onClick={this.openUsernameModal}>Changer de nom d'utilisateur</button>
          <button className="button big" onClick={this.openPasswordModal}>Changer de mot de passe</button>
          <UpdateAvatar />
          <div className="list">
            <div className="list-sub-menu">
              <i className="big-icon icon icon-temple"/>
              <h5>Groupes dont vous faites partie</h5>
            </div>
            <List
              data={guilds}
              type="guild"
              user={user}
              emptyListString="Vous ne faites partie d'aucun groupe. Rejoignez-en un et commencez à coopérer !"
            >
              <ChannelItem />
            </List>
            <div className="list-sub-menu">
              <i className="big-icon icon icon-bubble"/>
              <h5>Actions dont vous faites partie</h5>
            </div>
            <List
              data={channels}
              type="channel"
              emptyListString="Vous ne faites partie d'aucune action. Rejoignez-en une et passez à l'action !"
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
              emptyListString="Aucune évaluation. Finissez des actions et gagnez en réputation !"
            >
              <HistoryItem />
            </List>
          </div>

        </div>
        <AppNav user={user} />
      </div>
    );
  }
}
