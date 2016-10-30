import React        from 'react';

export default class ActionList extends React.Component {

  render() {
    const {
      actions
    } = this.props;

    return (
      <div>
        {actions.channelCount && actions.channelCount > 0 ?
          <div className="tag action-color">
            <i className="icon icon-action"/>
            <span>{actions.channelCount}</span>
          </div>
          : ''
        }
        {actions.beerCount && actions.beerCount > 0 ?
          <div alt="evenements" className="tag event-color">
            <i className="icon icon-event2"/>
            <span>{actions.beerCount}</span>
          </div>
          : ''
        }
        {actions.coinCount && actions.coinCount > 0 ?
          <div className="tag money-color">
              <i className="icon icon-euro"/>
              <span>{actions.coinCount}</span>
          </div>
          : ''
        }
        {actions.feedbackCount && actions.feedbackCount > 0 ?
          <div className="tag feedback-color">
              <i className="icon icon-star"/>
              <span>{actions.feedbackCount}</span>
          </div>
          : ''
        }
        {actions.pollCount && actions.pollCount > 0 ?
          <div className="tag pollz-color">
              <i className="icon icon-pie-chart"/>
              <span>{actions.pollCount}</span>
          </div>
          : ''
        }
      </div>
    );
  }
}
