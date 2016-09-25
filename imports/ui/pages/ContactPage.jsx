import React from 'react'
import { Link } from 'react-router';

import AppNav from '../components/AppNav.jsx';
import Breadcrumb from '../components/Breadcrumb.jsx';
import List from '../components/List.jsx';

import TeamItem from '../components/TeamItem.jsx'

export default class ContactPage extends React.Component {

  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.acceptInvite = this.acceptInvite.bind(this);
    this.refuseInvite = this.refuseInvite.bind(this);
  }

  acceptInvite(userSelectedId) {
    Meteor.call('repertory.acceptInvite', userSelectedId);
  }

  refuseInvite(userSelectedId) {
    Meteor.call('repertory.refuseInvite', userSelectedId);
  }

  removeContact(userSelectedId) {
    Meteor.call('repertory.removeContact', userSelectedId);
  }

  handleSubmit(e) {
    e.preventDefault();
    const userInvited = this.refs.userInvited.value;

    if (userInvited) {
      Meteor.call('repertory.sendInvite', userInvited);
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
        <div className="view-container">
          <div className="page-wrapper">
            <div className="scroll-content has-top-nav has-tabs-nav">
              <div className="disable-user-behavior">
                <div>Inviter un ami : </div>
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

                {
                  usersInvitationReceved.length ?
                    <div>
                      <div>Invitation(s) reçue(s) : </div>
                      <List
                        data={usersInvitationReceved}
                        type="invitation"
                        acceptInvite={this.acceptInvite}
                        refuseInvite={this.refuseInvite}
                      />
                    </div>
                    : ''
                }

                <div>Contact(s) : </div>
                <List
                  data={usersContact}
                  type="contact"
                  removeContact={this.removeContact}
                />
                <div>Groupe(s) : </div>
                <Link to={'/contact/createGroup'}>Creer un groupe</Link>
                <List
                  data={teams}
                  type="team"
                />
              </div>
            </div>
          </div>
        </div>
        <AppNav user={user}/>
      </div>
    );
  }
}
