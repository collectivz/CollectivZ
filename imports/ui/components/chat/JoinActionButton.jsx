import React from 'react';

import { Toast } from '../../helpers/Toast';

export default class JoinActionButton extends React.Component {

  constructor(props) {
    super(props);

    this.joinChannel = this.joinChannel.bind(this);
  }

  joinChannel() {
    const { channel } = this.props;

    Meteor.call('channels.join', channel._id, (err, res) => {
      if (err) {
        Toast(err.reason, 'danger');
      }
    });
  }

  render() {
    $('.chat-sub-container').toggleClass('open');
    return (
      <div ref="bar" className="chat-input-wrapper disabled open">
        <div className="chat-input-disabled">
          <button className="success button" onClick={this.joinChannel}>Rejoindre</button>
          <p>Vous devez rejoindre cette action avant de pouvoir envoyer un message</p>
        </div>
      </div>
    );
  }
}
