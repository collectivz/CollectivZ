import React from 'react';

export default class SubChannelItem extends React.Component {

  constructor(props) {
    super(props);

    this.joinChannel = this.joinChannel.bind(this);
  }

  joinChannel() {
    Meteor.call('channels.join', this.props.url);
  }

  render() {
    return (
      <div>

        <a href={'/#/chat/' + this.props.url} onClick={this.joinChannel}><button>Rejoindre</button></a>
      </div>
    );
  }
}
