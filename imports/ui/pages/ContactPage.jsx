import React from 'react'

import AppNav from '../components/AppNav.jsx';
import TopNav from '../components/TopNav.jsx';

import InvitationRecevedItem from '../components/InvitationRecevedItem.jsx'

export default class ContactPage extends React.Component {

  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
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
      usersTeams,
      usersInvitationReceved,
      loading,
      user,
    } = this.props;

    return (
      <div>
        <TopNav text={'Contact'} />
        <div className="view-container">
          <div className="page-wrapper">
            <div className="scroll-content has-top-nav has-tabs-nav">
              <div className="disable-user-behavior">
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
                <div className="list">
                  {usersInvitationReceved.map(function(userSelected) {
                     return <InvitationRecevedItem key={userSelected._id} userSelected={userSelected} />;
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
        <AppNav user={user}/>
      </div>
    );
  }
}
