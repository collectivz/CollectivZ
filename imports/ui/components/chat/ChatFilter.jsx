import React from 'react';

export default class ChatFilter extends React.Component {

  render() {
    const {
      channel,
      setFilterOption
    } = this.props;

    return (
      <div className="view-container">
        <div className="second">
          <p onClick={setFilterOption.bind(this, 'all')}>Tout voir</p>
          {channel.connections ?
            <div>
            {channel.connections.pollCount ?
              <i className="fa fa-pie-chart" aria-hidden="true" onClick={setFilterOption.bind(this, 'poll')}>{channel.connections.pollCount}</i>
              : ''
            }
            {channel.connections.chanCount ?
              <i className="fa fa-cogs" aria-hidden="true" onClick={setFilterOption.bind(this, 'channel')}>{channel.connections.chanCount}</i>
              : ''
            }
            {channel.connections.beerCount ?
              <i className="fa fa-calendar" aria-hidden="true" onClick={setFilterOption.bind(this, 'beer')}>{channel.connections.beerCount}</i>
              : ''
            }
            {channel.connections.feedbackCount ?
              <i className="fa fa-star-o" aria-hidden="true" onClick={setFilterOption.bind(this, 'feedback')}>{channel.connections.feedbackCount}</i>
              : ''
            }
            </div>
            : ''
          }
        </div>
      </div>
    );
  }
}
