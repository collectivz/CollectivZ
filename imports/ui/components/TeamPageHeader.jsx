import React                      from 'react';
import { Link }                   from 'react-router';
import { _ }                      from 'meteor/underscore';

import TeamUpdatePicture         from './TeamUpdatePicture.jsx';


export default class TeamPageHeader extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      editing: false,
      hasJoined: false
    };

    this.toggleEdit = this.toggleEdit.bind(this);
    this.changeTeamName = this.changeTeamName.bind(this);
  }

  toggleEdit() {
    this.setState({
      editing: true
    });
  }

  changeTeamName(e) {
    e.preventDefault();
    const { team } = this.props;
    const newName = this.refs.teamName.value;

    Meteor.call('teams.editName', team._id, newName);
    this.setState({
      editing: false
    });
  }

  getMemberCount(team) {
    if (team.members.length === 1) {
      return `${team.members.length} membre`
    } else {
      return `${team.members.length} membres`
    }
  }

  render() {

    const { team, user } = this.props;

    const { editing } = this.state;

    return (
      <div style={{ backgroundImage: `url(${team.background})` }} className="profile">
          <div className="profile-header">

              <img className="avatar" src={`${team.picture}`}/>

              { editing ?
                <form className="merged" onSubmit={this.changeTeamName} >
                  <input className="small" type="text" name="name" ref="teamName" defaultValue={team.name} />
                  <button className="small primary button" type="button" name="button" onClick={this.changeTeamName}>
                    <i className="icon icon-checkmark-circle"></i>
                  </button>
                </form>
              : <div>
                  <h3 className='username'>
                    {team.name}
                    {team.author === user._id ?
                      <i className="edit-info icon icon-pencil" onClick={this.toggleEdit}></i>
                      : ''
                    }
                  </h3>
                </div>
              }
              <div className="tag white">
                  <i className="icon icon-user"/>
                  <span>{this.getMemberCount(team)}</span>
              </div>

          </div>
      </div>
    );
  }
}
