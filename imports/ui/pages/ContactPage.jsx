import React from 'react'
import { Link } from 'react-router';

import AppNav from '../components/AppNav.jsx';
import Breadcrumb from '../components/Breadcrumb.jsx';
import List from '../components/List.jsx';
import CircleItem from '../components/CircleItem.jsx'
import UserItem from '../components/UserItem.jsx'
import CircleForm from '../components/CircleForm';
import ContactInvite from '../components/ContactInvite';
import DropDown from '../components/DropDown';
import { Toast }         from '../helpers/Toast';
import { openModal }         from '../helpers/Modal';


export default class ContactPage extends React.Component {

  constructor(props) {
    super(props);

    this.acceptInvite = this.acceptInvite.bind(this);
    this.refuseInvite = this.refuseInvite.bind(this);
    this.openCircleModal = this.openCircleModal.bind(this);
  }

  acceptInvite(userSelectedId) {
    Meteor.call('repertory.acceptInvite', userSelectedId, (err, res) => {
      if (err) {
        Toast(err.reason, "danger");
      }
    });
  }

  refuseInvite(userSelectedId) {
    Meteor.call('repertory.refuseInvite', userSelectedId, (err, res) => {
      if (err) {
        Toast(err.reason, "danger");
      }
    });
  }

  removeContact(userSelectedId) {
    Meteor.call('repertory.removeContact', userSelectedId, (err, res) => {
      if (err) {
        Toast(err.reason, "danger");
      } else {
        Toast(`Le contact a été supprimé.`, "success");
      }
    });
  }

  openInviteModal() {
    const component = <ContactInvite />;
    openModal(component, "Inviter un contact");
  }

  openCircleModal(circle, e) {
    const {
      usersContact
    } = this.props;

    if (!e) {
      circle = null;
    }

    const component = <CircleForm circle={circle} usersContact={usersContact} />;
    const title = circle ? 'Modifier le cercle' : 'Créer un cercle';
    openModal(component, title);
  }

  render() {
    const {
      repertory,
      usersContact,
      circles,
      usersInvitationReceived,
      usersInvitationSent,
      loading,
      user,
    } = this.props;

    return (
      <div>
        <Breadcrumb title="Contact" hasBack={false}>
          <DropDown>
            <ul>
              <li><a className="drop-down-menu-link" onClick={this.openInviteModal}> Inviter un contact </a></li>
              <li><a className="drop-down-menu-link" onClick={this.openCircleModal}> Créer un cercle </a></li>
            </ul>
          </DropDown>
        </Breadcrumb>
        <div className="sub-container">

          <div className="list-sub-menu">
              <i className="big-icon icon icon-bubble"/>
              <h5>Invitations en attente</h5>
          </div>

          {
            !usersInvitationReceived && !usersInvitationSent ?
              <div className="list-empty">
                <p><i className="icon icon-sad"/>Aucune invitation en cours.</p>
              </div>
            :
              <div>
                <List
                  data={usersInvitationReceived}
                  type="invitation"
                  acceptInvite={this.acceptInvite}
                  refuseInvite={this.refuseInvite}
                >
                  <UserItem />
                </List>

                <List
                  data={usersInvitationSent}
                  type="invitationSent"
                >
                  <UserItem />
                </List>
              </div>
          }
          <div className="list-sub-menu">
              <i className="big-icon icon icon-users"/>
              <h5>Contact(s)</h5>
          </div>

          <List
            data={usersContact}
            type="contact"
            removeContact={this.removeContact}
            emptyListString="Vous n'avez aucun contact. Ajouter vos amis !"
          >
            <UserItem />
          </List>

          <div className="list-sub-menu">
              <i className="big-icon icon icon-bubble"/>
              <h5>Cercle(s) </h5>
          </div>

          <List
            data={circles}
            type="circle"
            editCircle={this.openCircleModal}
            emptyListString="Aucun cercle créé."
          >
            <CircleItem />
          </List>

        </div>
        <AppNav user={user}/>
      </div>
    );
  }
}
