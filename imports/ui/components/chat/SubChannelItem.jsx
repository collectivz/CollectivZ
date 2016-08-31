import React from 'react';
import './SubChannelItem.css'

export default class SubChannelItem extends React.Component {

  constructor(props) {
    super(props);

    this.joinChannel = this.joinChannel.bind(this);
  }

  joinChannel() {
    Meteor.call('channels.join', this.props.channel._id);
  }

  render() {
    const {
      channel
    } = this.props;

    return (
      <div className="actionz-item">
        <div className="actionz-pie">
          <i className="fa fa-cogs"></i>
        </div>
        <div>
          <h4>Nouvelle Actionz : {channel.name} !</h4>
          <p><a href={'/group/' + channel._id} onClick={this.joinChannel}><button>Rejoindre</button></a></p>
        </div>
      </div>
    );
  }
}
