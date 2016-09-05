import React from 'react';
import { Link } from 'react-router';
import { _ } from 'meteor/underscore';

export default class GuildPageHeader extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      editing: false,
      hasJoined: false
    };

    this.toggleEdit = this.toggleEdit.bind(this);
    this.changeGuildName = this.changeGuildName.bind(this);
  }

  toggleEdit() {
    this.setState({
      editing: true
    });
  }

  changeGuildName(e) {
    e.preventDefault();
    const {
      guild
    } = this.props;
    const newName = this.refs.guildName.value;

    Meteor.call('guilds.changeName', newName, guild._id);
    this.setState({
      editing: false
    });
  }

  getMemberCount(guild) {
    if (guild.members.length === 1) {
      return `${guild.members.length} membre.`
    } else {
      return `${guild.members.length} membres.`
    }
  }

  render() {
    const {
      guild,
      user
    } = this.props;

    const {
      editing
    } = this.state;

    return (
      <div className="header-wrapper">
        <Link className="tweakChevron" to={'/guild-list'}><i className="fa fa-chevron-left"></i></Link>
        <div className="user-bg-wrapper" style={{background: `url(${guild.background})`}}>
        </div>
        <div className="info">
          <img className="avatar" src={`${guild.picture}`}/>
          { editing ?
            <div>
              <form className="new-msg" onSubmit={this.changeGuildName} >
                <input type="text" name="name" ref="guildName" defaultValue={guild.name} />
              </form>
              <button type="button" name="button" onClick={this.changeGuildName}>
                <i className="fa fa-check" aria-hidden="true"></i>
              </button>
            </div>
            : <div>
                <h2 className='username'>{guild.name}</h2>
                {_.contains(guild.leaders, user._id) ?
                  <i className="fa fa-pencil" aria-hidden="true" onClick={this.toggleEdit}></i>
                  : ''
                }
              </div>
          }
          <p>{this.getMemberCount(guild)}</p>
        </div>
      </div>
    );
  }
}
