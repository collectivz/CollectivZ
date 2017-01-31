import React from 'react';
import { Link } from 'react-router';

import AppNav from '../components/AppNav.jsx';
import Breadcrumb from '../components/Breadcrumb.jsx';
import List from '../components/List.jsx';
import CircleItem from '../components/CircleItem.jsx';
import UserItem from '../components/UserItem.jsx';
import CircleForm from '../components/CircleForm';
import ContactInvite from '../components/ContactInvite';
import DropDown from '../components/DropDown';
import TouchEvent from '../components/TouchEvent.jsx';
import { Toast } from '../helpers/Toast';
import { openModal } from '../helpers/Modal';


export default class ContactPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = { isLoaded: false };
    this.acceptInvite = this.acceptInvite.bind(this);
    this.refuseInvite = this.refuseInvite.bind(this);
    this.openCircleModal = this.openCircleModal.bind(this);
  }

  componentDidMount() {
    this.isLoaded();
  }

  acceptInvite(userSelectedId) {
    Meteor.call('repertory.acceptInvite', userSelectedId, (err, res) => {
      if (err) {
        Toast(err.reason, 'danger');
      }
    });
  }

  goTo(url) {
    setTimeout(() => {
      this.context.router.push(url);
    }, 350);
  }

  refuseInvite(userSelectedId) {
    Meteor.call('repertory.refuseInvite', userSelectedId, (err, res) => {
      if (err) {
        Toast(err.reason, 'danger');
      }
    });
  }

  removeContact(userSelectedId) {
    Meteor.call('repertory.removeContact', userSelectedId, (err, res) => {
      if (err) {
        Toast(err.reason, 'danger');
      } else {
        Toast('Le contact a été supprimé.', 'success');
      }
    });
  }

  openInviteModal() {
    const component = <ContactInvite />;
    openModal(component, 'Inviter un contact');
  }

  openCircleModal(circle, e) {
    const {
      usersContact,
    } = this.props;

    if (!e) {
      circle = null;
    }

    const component = <CircleForm circle={circle} usersContact={usersContact} />;
    const title = circle ? 'Modifier le cercle' : 'Créer un cercle';
    openModal(component, title);
  }

  isLoaded() {
    setTimeout(() => {
      this.setState({ isLoaded: true });
    }, 1350);
  }

  renderChild() {
    const {
      children,
      ...props
    } = this.props;

    return children && React.cloneElement(children, props);
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
      children,
    } = this.props;

    return (
      <div>
        { children ?
          this.renderChild()
          :
          <div>
            <Breadcrumb title="Contact" hasBack={false}>
              <TouchEvent class="right-button touch-event" onClick={this.openInviteModal}>
                <i className="icon icon-rotate-45 icon-cross" />
              </TouchEvent>
            </Breadcrumb>
            <div className="sub-container">

              <div>
                <div className="list-sub-menu small">
                  <i className="big-icon icon icon-users" />
                  <h5>Vos invitations en attente</h5>
                </div>
                <List
                  data={usersInvitationReceived}
                  type="invitation"
                  emptyListString="Aucune invitation en attente"
                  acceptInvite={this.acceptInvite}
                  refuseInvite={this.refuseInvite}
                >
                  <UserItem />
                </List>
                <div className="list-sub-menu small">
                  <i className="big-icon icon icon-users" />
                  <h5>Vos invitations envoyées</h5>
                </div>
                <List
                  data={usersInvitationSent}
                  emptyListString="Aucune invitation en cours de validation"
                  type="invitationSent"
                >
                  <UserItem />
                </List>

                <div className="list-sub-menu small">
                  <i className="big-icon icon icon-users" />
                  <h5>Vos contacts</h5>
                </div>
                <List
                  data={usersContact}
                  type="contact"
                  removeContact={this.removeContact}
                  goToProfile={this.goTo}
                  emptyListString="Vous n'avez aucun contact. Ajouter vos amis !"
                >
                  <UserItem />
                </List>
              </div>

              <hr className="hidden" />
              <button className="button self-center success" onClick={this.goTo.bind(this, '/contact/circles')} >
                Gérer mes cercles
              </button>
              {/*
              {
                (!this.state.isLoaded && usersContact && usersContact.length > 0)
                ?
                  ""
                :
                  <a className="success self-center button" onClick={this.openInviteModal}> Inviter un contact </a>
              }
              */}
            </div>
          </div>
        }
        <AppNav user={user} />
      </div>
    );
  }
}

ContactPage.contextTypes = {
  router: React.PropTypes.object,
};
