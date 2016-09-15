import React                      from 'react';
import { Link }                   from 'react-router';
import { _ }                      from 'meteor/underscore';

import GuildUpdatePicture         from './GuildUpdatePicture.jsx';


export default class GuildPageHeader extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      editing: false,
      hasJoined: false
    };

    this.toggleEdit = this.toggleEdit.bind(this);
    this.changeGuildName = this.changeGuildName.bind(this);
    this.joinGuild = this.joinGuild.bind(this);
  }

  joinGuild() {
    Meteor.call('guilds.join', this.props.guild._id);
    this.setState({
      hasJoined: true
    });
  }

  toggleEdit() {
    this.setState({
      editing: true
    });
  }

  changeGuildName(e) {
    e.preventDefault();
    const { guild } = this.props;
    const newName = this.refs.guildName.value;

    Meteor.call('guilds.changeName', newName, guild._id);
    this.setState({
      editing: false
    });
  }

  getMemberCount(guild) {
    if (guild.members.length === 1) {
      return `${guild.members.length} membre`
    } else {
      return `${guild.members.length} membres`
    }
  }

  render() {

    const { guild, user, members, channels } = this.props;

    let hasJoined = false;

    if (_.contains(guild.members, user._id)) {
      hasJoined = true;
    }

    const { editing } = this.state;

    return (
      <div style={{ backgroundImage: `url(${guild.background})` }} className="profile">
          <div className="profile-header">

              <img className="avatar" src={`${guild.picture}`}/>

              { editing ?
                <form className="merged" onSubmit={this.changeGuildName} >
                  <input className="small" type="text" name="name" ref="guildName" defaultValue={guild.name} />
                  <button className="small primary button" type="button" name="button" onClick={this.changeGuildName}>
                    <i className="icon icon-checkmark-circle"></i>
                  </button>
                </form>
              : <div>
                  <h3 className='username'>
                    {guild.name}
                    {_.contains(guild.leaders, user._id) ?
                      <i className="edit-info icon icon-pencil" onClick={this.toggleEdit}></i>
                      : ''
                    }
                  </h3>
                </div>
              }
              <div className="tag white">
                  <i className="icon icon-user"/>
                  <span>{this.getMemberCount(guild)}</span>
              </div>
              <hr className="invisible" />
              {this.state.hasJoined || hasJoined ?
                <div className="tag white">
                    <i className="icon icon-checkmark-circle"/>
                    <span>Vous faites partie de ce groupe.</span>
                </div>
                :
                <button className="primary button" onClick={this.joinGuild}>Rejoindre {guild.name}</button>
              }

              {/*_.contains(guild.leaders, user._id) ?
                  <GuildUpdatePicture guild={guild}/>
                : ''
              */}

          </div>
      </div>
    );
  }
}
