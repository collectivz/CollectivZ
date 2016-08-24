import React from 'react';

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
      <div>
        <a href={'/group/' + channel._id} onClick={this.joinChannel}>{channel.name}<button>Rejoindre</button></a>
      </div>
    );
  }
}
