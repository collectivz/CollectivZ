import React from 'react';
import './SubChannelItem.css'

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
      <div className="actionz-item">
        <div className="actionz-pie">
          <i className="fa fa-cogs"></i>
        </div>
        {channel ?
          <div>
            <h4>Nouvelle Actionz : {channel.name} !</h4>
            {this.hasJoined() ?
              'Vous faites parti de cette mission.'
              : <p><a href={'/group/' + channel._id} onClick={this.joinChannel}><button>Rejoindre</button></a></p>
            }
          </div>
          : ''
        }
      </div>
    );
  }
}
