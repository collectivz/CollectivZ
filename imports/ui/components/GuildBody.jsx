import React from 'react';
import { _ } from 'meteor/underscore';

import GuildUpdatePicture from './GuildUpdatePicture.jsx';
import ChannelItem from './ChannelItem.jsx';
import UserItem from './UserItem.jsx';

export default class GuildBody extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      hasJoined: false
    };

    this.joinGuild = this.joinGuild.bind(this);
  }

  componentWillMount() {
    const {
      guild,
      user
    } = this.props;

    if (_.contains(guild.members, user._id)) {
      this.setState({
        hasJoined: true
      });
    }
  }

  joinGuild() {
    Meteor.call('guilds.join', this.props.guild._id);
    this.setState({
      hasJoined: true
    });
  }

  render() {
    const {
      guild,
      user,
      members,
      channels
    } = this.props;

    let sortedChannels = channels;
    if (sortedChannels.length > 1) {
      sortedChannels = sortedChannels.sort((a, b) => {
        return b.members.length - a.members.length;
      });
    }
    return (
      <div>
        {this.state.hasJoined ?
          'Vous faites parti de cette communauté.'
          : <button onClick={this.joinGuild}>Rejoindre {guild.name}</button>
        }
        {_.contains(guild.leaders, user._id) ?
            <GuildUpdatePicture guild={guild}/>
          : ''
        }
        <h4>Liste des membres</h4>
        {members.map(member => {
          return (<UserItem user={member} key={member._id}/>);
        })}
        <h4>Liste des actions en cours</h4>
        {channels.length ?
          <div>
            {channels.map(channel => {
              return (<ChannelItem channel={channel} key={channel._id} />);
            })}
          </div>
        : "Aucune action en cours"
        }
      </div>
    );
  }
}
