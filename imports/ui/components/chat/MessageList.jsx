import React from 'react';

import MessageItem from './MessageItem.jsx';
import CoinItem from './CoinItem.jsx';
import SubChannelItem from './SubChannelItem.jsx';
import BeerItemContainer from '../../containers/BeerItemContainer.jsx';
import FeedbackItem from './FeedbackItem.jsx';
import PollItemContainer from '../../containers/PollItemContainer.jsx';

export default class MessageList extends React.Component {
  render() {
    const {
      beers,
      polls,
      messages,
      subChannels,
      feedbacks,
      coins,
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
              return (<BeerItemContainer key={message._id} beer={beer} />);
            case 'poll':
              const poll = polls.find((poll) => {
                if (poll.messageId === message._id)
                  return true;
                return false;
              });
              return (<PollItemContainer key={message._id} poll={poll} />);
            case 'channel':
              const channel = subChannels.find((channel) => {
                if (channel.messageId === message._id)
                  return true;
                return false;
              });
              return (<SubChannelItem key={message._id} channel={channel} />);
            case 'coin':
              const coin = coins.find((coin) => {
                if (coin.messageId === message._id)
                  return true;
                return false;
              });
              return (<CoinItem key={message._id} coin={coin} />);
            case 'feedback':
              const feedback = feedbacks.find((feedback) => {
                if (feedback.messageId === message._id)
                  return true;
                return false;
              });
              return (<FeedbackItem key={message._id} feedback={feedback} />);
            default:
              return (<MessageItem key={message._id} message={message}/>);
          }
        })}
      </div>
    );
  }
}
