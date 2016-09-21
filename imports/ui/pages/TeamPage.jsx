import React              from 'react'
import { Link }           from 'react-router';

import AppNav             from '../components/AppNav.jsx';
import Breadcrumb         from '../components/Breadcrumb';
import Loader             from '../components/Loader.jsx';
import TeamPageHeader     from '../components/TeamPageHeader.jsx';
import TeamBody           from '../components/TeamBody.jsx';

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
        <TeamBody
        teamMembers={teamMembers}
        usersContact={usersContact}
        team={team}
        />
        </div>
        <AppNav user={user}/>
        </div>
      }
      </div>
    );
  }
}
