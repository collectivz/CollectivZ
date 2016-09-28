import React from 'react';

export default class SubChannelItem extends React.Component {

  constructor(props) {
    super(props);

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
              <i className="big-icon icon icon-thumbs-up"/>
              <div className="bubble-header">
                  <i className="icon icon-cog"/>
                  <span>Nouvelle Actionz : {channel.name}</span>
              </div>
                <p><a href={'/group/' + channel._id}><button>Rejoindre</button></a></p>
                <span>{channel.description}</span>
          </div>
      </div>
      : null
    );
  }
}
