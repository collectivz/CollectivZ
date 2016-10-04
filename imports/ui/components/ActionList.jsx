import React        from 'react';

export default class ActionList extends React.Component {

  render() {
    const {
      actions
    } = this.props;

    return (
      <div>
        {actions.pollCount ?
          <div className="tag">
              <i className="icon icon-pie-chart"/>
              <span>{actions.pollCount}</span>
          </div>
          : ''
        }
        {actions.channelCount ?
          <div className="tag">
              <i className="icon icon-cog"/>
              <span>{actions.channelCount}</span>
          </div>
          : ''
        }
        {actions.beerCount ?
          <div className="tag">
              <i className="icon icon-calendar-full"/>
              <span>{actions.beerCount}</span>
          </div>
          : ''
        }
        {actions.feedbackCount ?
          <div className="tag">
              <i className="icon icon-star"/>
              <span>{actions.feedbackCount}</span>
          </div>
          : ''
        }
      </div>
    );
  }
}
