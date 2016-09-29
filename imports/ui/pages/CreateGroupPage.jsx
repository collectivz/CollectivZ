import React from 'react'

import AppNav from '../components/AppNav.jsx';
import Breadcrumb from '../components/Breadcrumb.jsx';
import { Toast }         from '../helpers/Toast';
import List from '../components/List.jsx'
import UserItem from '../components/UserItem.jsx'

export default class CreateGroupPage extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      newGroup: [],
    };

    this.addToNewGroup = this.addToNewGroup.bind(this);
    this.removeFromNewGroup = this.removeFromNewGroup.bind(this);
    this.createNewGroup = this.createNewGroup.bind(this);
    this.resetNewGroup = this.resetNewGroup.bind(this);
    this.toggleCreateButton = this.toggleCreateButton.bind(this);
  }

  addToNewGroup(userSelectedId) {
    if (_.contains(this.state.newGroup, userSelectedId)) {
      console.log('Vous avez déjà ajouté cette personne.');
    } else {
      this.setState({
        newGroup: this.state.newGroup.concat(userSelectedId),
      });
    }
  }

  removeFromNewGroup(userSelectedId) {
    const index = this.state.newGroup.indexOf(userSelectedId);
    if (index >= 0) {
      let newGroup = this.state.newGroup;
      newGroup.splice(index, 1);
      this.setState({
        newGroup,
      });
    }
  }

  createNewGroup(e) {
    e.preventDefault();
    const teamName = this.refs.teamName.value;

    Meteor.call('teams.insert', this.state.newGroup, teamName, (err, res) => {
      if (err) {
        Toast(err.reason, "danger");
      } else {
        Toast(`Le cercle a bien été créé.`, "success");
      }
    });
    this.setState({
      newGroup: [],
    });
  }

  resetNewGroup(e) {
    e.preventDefault();
    this.setState({
      newGroup: [],
    });
  }

  toggleCreateButton() {
    let state = this.state.newGroup;
    if (state.length > 0) {
      return (
        <div>
          <div>Donner un nom à votre cercle</div>
          <div>
            <form onSubmit={this.createNewGroup}>
              <input
                type="text"
                placeholder="nom du cercle"
                ref="teamName"
              />
              <input type="submit" value="Créer le groupe" />
            </form>
          </div>
        </div>
      );
    } else {
      return ;
    }
  }

  render() {
    const {
      repertory,
      usersContact,
      loading,
      user,
    } = this.props;

    return (
      <div>
        <Breadcrumb title="Créer un groupe" hasBack={true} />
        <div className="view-container">
          <div className="page-wrapper">
            <div className="scroll-content has-top-nav has-tabs-nav">
              <div className="disable-user-behavior">
                </div>
                {this.toggleCreateButton()}
                <div>Contact(s) : </div>
                <List
                  data={usersContact}
                  type="createGroup"
                  addToNewGroup={this.addToNewGroup}
                  removeFromNewGroup={this.removeFromNewGroup}
                  currentState={this.state}
                  emptyListString="Vous n'avez aucun contact à ajouter dans ce cercle."
                >
                  <UserItem />
                </List>
              </div>
            </div>
          </div>
        <AppNav user={user}/>
      </div>
    );
  }
}
