import React              from 'react'
import { Link }           from 'react-router';

import AppNav             from '../components/AppNav.jsx';
import Breadcrumb         from '../components/Breadcrumb';
import Loader             from '../components/Loader.jsx';
import TeamPageHeader     from '../components/TeamPageHeader.jsx';
import List               from '../components/List.jsx';
import UserItem               from '../components/UserItem.jsx';

export default class TeamPage extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      newGroup: [],
      ini: 1
    };

    this.addToGroup = this.addToGroup.bind(this);
    this.removeFromGroup = this.removeFromGroup.bind(this);
    this.toggleButton = this.toggleButton.bind(this);
    this.changeGroupMembers = this.changeGroupMembers.bind(this);
  }

  componentWillUpdate({ loading, team }) {
    if (!loading && this.state.ini) {
      this.setState({
        newGroup: team.members,
        ini: 0,
        edit: 0
      })
    }
  }

  addToGroup(userSelectedId) {
    if (!_.contains(this.state.newGroup, userSelectedId)) {
      this.setState({
        newGroup: this.state.newGroup.concat(userSelectedId),
        edit: 1
      });
    }
  }

  removeFromGroup(userSelectedId) {
    let index;
    if (_.contains(this.state.newGroup, userSelectedId)) {
      index = this.state.newGroup.indexOf(userSelectedId);
      let newGroup = this.state.newGroup;
      newGroup.splice(index, 1);
      this.setState({
        newGroup,
        edit: 1
      });
    }
  }

  changeGroupMembers(e) {
    e.preventDefault();
    Meteor.call('teams.changeMembers', this.props.team._id, this.state.newGroup, (err, res) => {
      if (err) {
        Toast(err.reason, "danger");
      } else {
        Toast(`Le groupe a bien été modifié.`, "success");
      }
    });
    this.setState({
      edit: 0
    });
  }

  toggleButton() {
    if (this.state.edit) {
      return (
        <div>
          <button onClick={this.changeGroupMembers}>Enregistrer les modifications</button>
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
      teamMembers,
      team,
      loading,
      user,
    } = this.props;

    return (
      <div className="screen-box">
      {
        loading ? <Loader />
        :
        <div className="screen-box">
          <Breadcrumb title="Profil du groupe" hasBack={true}/>
          <div className="sub-container">
            <TeamPageHeader
              team={team}
              user={user}
            />
            <div>Membre(s) : </div>
            <List
              data={teamMembers}
              type="userMiniature"
              emptyListString="Aucun membre dans ce cercle. Supprimez le ?"
            >
              <UserItem />
            </List>
            <div>Contact(s) : </div>
            {this.toggleButton()}
            <List
              data={usersContact}
              type="manageGroup"
              addToGroup={this.addToGroup}
              removeFromGroup={this.removeFromGroup}
              teamMembers={team.members}
              currentState={this.state}
              emptyListString="Vous n'avez personne à ajouter dans ce cercle. Invitez des personnes dans vos contact."
            >
              <UserItem />
            </List>
          </div>
          <AppNav user={user}/>
        </div>
      }
      </div>
    );
  }
}
