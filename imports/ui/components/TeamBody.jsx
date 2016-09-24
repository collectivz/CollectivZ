import React                      from 'react';
import { _ }                      from 'meteor/underscore';

import TeamUpdatePicture          from './TeamUpdatePicture.jsx';
import UserItem                   from './UserItem.jsx';

export default class TeamBody extends React.Component {

  render() {

    const { team, usersContact, teamMembers } = this.props;

    return (
      <div className="list">

        <div className="list-sub-menu">
            <i className="big-icon icon icon-users"/>
            <h5>Liste des membres</h5>
        </div>

        {teamMembers.map(member => {
          return (<UserItem user={member} />);
        })}
      </div>
    );
  }
}
