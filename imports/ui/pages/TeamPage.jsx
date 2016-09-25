import React              from 'react'
import { Link }           from 'react-router';

import AppNav             from '../components/AppNav.jsx';
import Breadcrumb         from '../components/Breadcrumb';
import Loader             from '../components/Loader.jsx';
import TeamPageHeader     from '../components/TeamPageHeader.jsx';
import List               from '../components/List.jsx';

export default class TeamPage extends React.Component {

  constructor(props) {
    super(props);
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
        loading ?
        <Loader />
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
          type="manageGroup"
        />
        <div>Contact(s) : </div>
        <List
          data={usersContact}
          type="manageGroup"
        />
        </div>
        <AppNav user={user}/>
        </div>
      }
      </div>
    );
  }
}
