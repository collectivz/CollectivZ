import React, { Component, PropTypes }  from 'react';
import { Meteor }                       from 'meteor/meteor';

import UserHeader                       from '../components/UserHeader.jsx';
import ChannelItem                       from '../components/ChannelItem.jsx';
import HistoryItem                       from '../components/HistoryItem.jsx';
import AppNav                           from '../components/AppNav.jsx';
import Breadcrumb                       from '../components/Breadcrumb.jsx';
import List                             from '../components/List';
import PasswordEdit                    from '../components/PasswordEdit.jsx';
import UploadPicture                    from '../components/UploadPicture.jsx';
import UsernameEdit                    from '../components/UsernameEdit.jsx';
import { openModal }                    from '../helpers/Modal.js';

export default class MyProfile extends Component {

  constructor(props) {
    super(props);

    this.openPasswordModal = this.openPasswordModal.bind(this);
    this.openUsernameModal = this.openUsernameModal.bind(this);
    this.openPictureModal = this.openPictureModal.bind(this);
  }

  openPasswordModal() {
    const component = <PasswordEdit />;
    openModal(component, "Modifier le mot de passe");
  }

  openPictureModal() {
    const {
      user
    } = this.props;

    const component = <UploadPicture data={user} method='users.changeAvatar' />;
    openModal(component, `Modifier votre avatar.`);
  }

  openUsernameModal() {
    const {
      user
    } = this.props;
    const component = <UsernameEdit user={user}/>;
    openModal(component, "Modifier votre nom d'utilisateur");
  }

  logout() {
    Meteor.logout();
  }

  render() {

    const { user, groups, channels, history } = this.props;
    let actionHistory = [];

    if (history) {
      actionHistory = history.actionHistory;
    }

    return (
      <div className="screen-box">

        <Breadcrumb title="Mon profil" hasBack={false} />
        <div className="sub-container">

          <UserHeader user={user}/>
          <div className="button-box profile-button">
            <button className="button big info" onClick={this.openUsernameModal}><i className="icon icon-user"/><span>Changer de nom d'utilisateur</span></button>
            <button className="button big info" onClick={this.openPasswordModal}><i className="icon icon-lock"/><span>Changer de mot de passe</span></button>
            <button className="button big info" onClick={this.openPictureModal}><i className="icon icon-camera"/><span>Changer d'avatar</span></button>
            <button className="button big info" onClick={this.logout}><i className="icon icon-enter"/><span>Se déconnecter</span></button>
          </div>
          <div className="list">
            <div className="list-sub-menu">
              <i className="big-icon icon icon-temple"/>
              <h5>Groupes dont vous faites partie</h5>
            </div>
            <List
              data={groups}
              type="group"
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
              renderMargin={false}
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
