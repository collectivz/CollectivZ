import React from 'react';

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
      user
    } = this.props;

    return (
      <div>
        {this.state.hasJoined ?
          'Vous faites parti de cette communauté.'
          : <button onClick={this.joinGuild}>Rejoindre {guild.name}</button>
        }
      </div>
    );
  }
}
