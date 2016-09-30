import React from 'react';

export default class SubChannelItem extends React.Component {

  constructor(props) {
    super(props);

    this.joinChannel = this.joinChannel.bind(this);
  }

  joinChannel() {
    const {
      channel
    } = this.props;

    this.context.router.push(`/group/${channel._id}`);
  }

  render() {
    const {
      channel,
      user
    } = this.props;

    return (
      channel ?
      <div className="chat-special-bubble chat-special-bubble-mission">
          <div className="bubble-content">
              <div className="bubble-header">
                  <h4><i className="icon icon-cog"/>{channel.name}</h4>
              </div>
              <div className="bubble-content-text">
                <p>
                  <span>{channel.description}</span>
                </p>
                <div className="button-box">
                  <button className="button success" onClick={this.joinChannel}>Rejoindre</button>
                </div>
              </div>
          </div>
      </div>
      : null
    );
  }
}

SubChannelItem.contextTypes = {
  router: React.PropTypes.object
};
