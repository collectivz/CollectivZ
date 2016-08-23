import React from 'react';

import MessageItem from './MessageItem.jsx';
import SubChannelItem from './SubChannelItem.jsx';
import BeerItem from './BeerItem.jsx';
import PollItem from './PollItem.jsx';

export default class MessageList extends React.Component {
  render() {
    const {
      beers,
      polls,
      messages,
      subChannels
    } = this.props;

    return (
      <div>
        {messages.map((message) => {
          switch(message.type) {
            case 'beer':
              const beer = beers.find((beer) => {
                if (beer.messageId === message._id)
                  return true;
                return false;
              });
              return (<BeerItem key={message._id} beer={beer} />);
            case 'poll':
              const poll = polls.find((poll) => {
                if (poll.messageId === message._id)
                  return true;
                return false;
              });
              return (<PollItem key={message._id} poll={poll} />);
            case 'channel':
              const channel = subChannels.find((channel) => {
                if (channel.messageId === message._id) {}
                  return true;
                return false;
              });
              return (<SubChannelItem key={message._id} channel={channel} />);
            default:
              return (<MessageItem key={message._id} message={message}/>);
          }
        })}
      </div>
    );
  }
}
