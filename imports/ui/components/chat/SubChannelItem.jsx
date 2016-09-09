import React from 'react';

export default class SubChannelItem extends React.Component {

  constructor(props) {
    super(props);

    this.joinChannel = this.joinChannel.bind(this);
    this.hasJoined = this.hasJoined.bind(this);
  }

  joinChannel() {
    Meteor.call('channels.join', this.props.channel._id);
  }

  hasJoined() {
    const {
      channel,
      user
    } = this.props;
    
    return _.contains(channel.members, user._id);
  }

  render() {
    const {
      channel,
      user
    } = this.props;

    return (
      <div className="chat-special-bubble chat-special-bubble-mission">
          <div className="bubble-content">
              <i className="big-icon icon icon-thumbs-up"/>
              <div className="bubble-header">
                  <i className="icon icon-cog"/>
                  <span>Nouvelle Actionz : {channel.name} !</span>
              </div>
              {this.hasJoined() ?
                  <p>Vous faites maintenant parti de cette mission !</p>
                : <p><a href={'/group/' + channel._id} onClick={this.joinChannel}><button>Rejoindre</button></a></p>
              }
          </div>
      </div>
    );
  }
}
