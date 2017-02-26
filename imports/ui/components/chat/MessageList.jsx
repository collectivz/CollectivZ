import React from "react";

import MessageItemContainer from "../../containers/MessageItemContainer.jsx";
import CoinItem from "./CoinItem.jsx";
import ActionItem from "./ActionItem.jsx";
import BeerItemContainer from "../../containers/BeerItemContainer.jsx";
import FeedbackItem from "./FeedbackItem.jsx";
import PollItemContainer from "../../containers/PollItemContainer.jsx";

export default class MessageList extends React.Component {
  render() {
    const {
      beers,
      polls,
      messages,
      subChannels,
      feedbacks,
      coins,
      user,
      channel,
      answerToMessage
    } = this.props;

    return (
      <div className="msg-list-parser">
        {messages.map(message => {
          switch (message.type) {
            case "beer":
              const beer = beers.find(beer => {
                if (beer.messageId === message._id) {
                  return true;
                }
                return false;
              });
              return (
                <BeerItemContainer key={message._id} beer={beer} user={user} />
              );
            case "poll":
              const poll = polls.find(poll => {
                if (poll.messageId === message._id) {
                  return true;
                }
                return false;
              });
              return (
                <PollItemContainer key={message._id} poll={poll} user={user} />
              );
            case "channel":
              const _channel = subChannels.find(_channel => {
                if (_channel.messageId === message._id) {
                  return true;
                }
                return false;
              });
              return (
                <ActionItem key={message._id} channel={_channel} user={user} />
              );
            case "coin":
              const coin = coins.find(coin => {
                if (coin.messageId === message._id) {
                  return true;
                }
                return false;
              });
              return <CoinItem key={message._id} coin={coin} user={user} />;
            case "feedback":
              const feedback = feedbacks.find(feedback => {
                if (feedback.messageId === message._id) {
                  return true;
                }
                return false;
              });
              return (
                <FeedbackItem
                  key={message._id}
                  feedback={feedback}
                  channel={channel}
                />
              );
            default:
              return (
                <MessageItemContainer
                  key={message._id}
                  message={message}
                  user={user}
                  answerToMessage={answerToMessage}
                />
              );
          }
        })}
      </div>
    );
  }
}
