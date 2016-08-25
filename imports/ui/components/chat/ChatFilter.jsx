import React from 'react';

export default class ChatFilter extends React.Component {

  isDisplayed(type, channel) {
    const connections = channel.connections;
    const shown = {display:'inline'};
    const hidden = {display:'none'};

    if (connections) {
      switch (type) {
        case 'channel':
          if (connections.chanCount) {
            return shown;
          }
          return hidden;
        case 'poll':
          if (connections.pollCount) {
            return shown;
          }
          return hidden;
        case 'beer':
          if (connections.beerCount) {
            return shown;
          }
          return hidden;
        case 'feedback':
          if (connections.feedbackCount) {
            return shown;
          }
          return hidden;
        default:
          break;
      }
    } else {
      return hidden;
    }
  }

  render() {
    const {
      channel,
      setFilterOption
    } = this.props;

    return (
      <div className="view-container">
        <div className="second">
          <p onClick={setFilterOption.bind(this, 'all')}>Tout voir</p>
          Filtrer par :
          <p onClick={setFilterOption.bind(this, 'channel')} style={this.isDisplayed('channel', channel)}>
            <i className="fa fa-cogs" aria-hidden="true"></i>
            ActionZ
          </p>
          <p onClick={setFilterOption.bind(this, 'poll')} style={this.isDisplayed('poll', channel)}>
            <i className="fa fa-pie-chart" aria-hidden="true"></i>
            PollZ
          </p>
          <p onClick={setFilterOption.bind(this, 'beer')} style={this.isDisplayed('beer', channel)}>
            <i className="fa fa-user-plus" aria-hidden="true"></i>
            BeerZ
          </p>
          <p onClick={setFilterOption.bind(this, 'feedback')} style={this.isDisplayed('feedback', channel)}>
            <i className="fa fa-user-plus" aria-hidden="true"></i>
            FeedbackZ
          </p>
        </div>
      </div>
    );
  }
}
