import React from 'react';

export default class JoinActionButton extends React.Component {

  constructor(props) {
    super(props);

    this.joinChannel = this.joinChannel.bind(this);
  }

  joinChannel() {
    const { channel } = this.props;

    Meteor.call('channels.join', channel._id);
  }

  render() {
    return (
      <div ref="bar" className="chat-input-wrapper disabled">
        <div className="chat-input-disabled">
          <button className="success button" onClick={this.joinChannel}>Rejoindre</button>
          <p>Vous devez rejoindre cette action avant de pouvoir envoyer un message</p>
        </div>
      </div>
    );
  }
}
