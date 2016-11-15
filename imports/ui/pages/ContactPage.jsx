import React from 'react'
import { Link } from 'react-router';

import AppNav from '../components/AppNav.jsx';
import Breadcrumb from '../components/Breadcrumb.jsx';
import List from '../components/List.jsx';
import UserItem from '../components/UserItem.jsx'
import ContactInvite from '../components/ContactInvite';
import TouchEvent from '../components/TouchEvent.jsx';
import { Toast }         from '../helpers/Toast';
import { openModal }         from '../helpers/Modal';


export default class ContactPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {isLoaded: false};
    this.acceptInvite = this.acceptInvite.bind(this);
    this.refuseInvite = this.refuseInvite.bind(this);
  }

  componentDidMount() {
    this.isLoaded();
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

  goTo(url) {
    this.context.router.push(url);
  }

  renderChild() {
    const {
      children,
      ...props
    } = this.props;

    return children && React.cloneElement(children, props);
  }

  openInviteModal() {
    const component = <ContactInvite />;
    openModal(component, "Inviter un contact");
  }

  isLoaded() {
    setTimeout( () => {
      this.setState({isLoaded: true});
    }, 1350 );
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
      children
    } = this.props;

    return (
      <div>
      {
        children ?
          this.renderChild()
        :
          <div>
            <Breadcrumb title="Contact" hasBack={false}>
              <TouchEvent class="right-button touch-event" onClick={this.openInviteModal}>
                <i className="icon icon-rotate-45 icon-cross" />
              </TouchEvent>
            </Breadcrumb>
            <div className="sub-container">

              <div className="list-sub-menu small">
                  <i className="big-icon icon icon-users"/>
                  <h5>Vos Contacts</h5>
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
              <List
                data={usersContact}
                type="contact"
                removeContact={this.removeContact}
                emptyListString="Vous n'avez aucun contact. Ajouter vos amis !"
              >
                <UserItem />
              </List>
              {
                (usersContact && usersContact.length > 0)
                ?
                  ""
                :
                  <a className="success self-center button" onClick={this.openInviteModal}> Inviter un contact </a>
              }
              <TouchEvent class="touch-event" onClick={this.goTo.bind(this, '/contact/circles')} >
                <p>Gérer mes cercles</p>
              </TouchEvent>
            </div>
          </div>
      }
        <AppNav user={user}/>
      </div>
    );
  }
}

ContactPage.contextTypes = {
  router: React.PropTypes.object
};
