import React from 'react'
import { Link } from 'react-router';

import AppNav from '../components/AppNav.jsx';
import Breadcrumb from '../components/Breadcrumb.jsx';
import List from '../components/List.jsx';
import TeamItem from '../components/TeamItem.jsx'
import UserItem from '../components/UserItem.jsx'
import { Toast }         from '../helpers/Toast';


export default class ContactPage extends React.Component {

  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.acceptInvite = this.acceptInvite.bind(this);
    this.refuseInvite = this.refuseInvite.bind(this);
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
        Toast(`Le contact a été supprimé.`);
      }
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const userInvited = this.refs.userInvited.value;

    if (userInvited) {
      Meteor.call('repertory.sendInvite', userInvited, (err, res) => {
        if (err) {
          Toast(err.reason, "danger");
        } else {
          Toast(`Une invitation a été envoyé.`);
        }
      });
      this.refs.userInvited.value = '';
    }
  }

  render() {
    const {
      repertory,
      usersContact,
      teams,
      usersInvitationReceved,
      loading,
      user,
    } = this.props;

    return (
      <div>
        <Breadcrumb title="Contact" hasBack={false} />
        <div className="sub-container">
                
          <div className="list">

            <div className="list-item touch-event">
              <img alt="" />
              <div className="list-item-content">
                <p className="title">Inviter un ami</p>
                <div></div>
              </div>
            </div>

            {/*<Link to={'/contact/createGroup'}>Creer un groupe</Link>*/}

            <div className="list-item touch-event">
              <img alt="" />
              <div className="list-item-content">
                <p className="title">Gérer mes contacts</p>
                <div></div>
              </div>
            </div>

          </div>
          
        {/*

          // Rajouter une modal à la place

          <div>
            <form onSubmit={this.handleSubmit}>
              <input
                type="text"
                placeholder="Nom d'utilisateur ou mail'"
                ref="userInvited"
              />
              <input type="submit" value="Envoyer une invitation" />
            </form>
          </div>
        
        */}

          <div className="list-sub-menu">
              <i className="big-icon icon icon-bubble"/>
              <h5>Invitations en attente</h5>
          </div>

          <List
            data={usersInvitationReceved}
            type="invitation"
            acceptInvite={this.acceptInvite}
            refuseInvite={this.refuseInvite}
            emptyListString="Vous n'avez aucune invitation en cours."
          >
            <UserItem />
          </List>

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
            data={teams}
            type="team"
            emptyListString="Aucun cercle créé."
          >
            <TeamItem />
          </List>

        </div>
        <AppNav user={user}/>
      </div>
    );
  }
}
