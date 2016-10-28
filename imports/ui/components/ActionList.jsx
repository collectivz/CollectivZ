import React        from 'react';

export default class ActionList extends React.Component {

  render() {
    const {
      actions
    } = this.props;

    return (
      <div>
        {actions.channelCount ?
          <div className="tag action-color">
            <i className="icon icon-cog"/>
            <span>{actions.channelCount}</span>
          </div>
          : ''
        }
        {actions.beerCount ?
          <div alt="evenements" className="tag event-color">
            <i className="icon icon-beer"/>
            <span>{actions.beerCount}</span>
          </div>
          : ''
        }
        {actions.feedbackCount ?
          <div className="tag money-color">
              <i className="icon icon-euro"/>
              <span>{actions.coinCount}</span>
          </div>
          : ''
        }
        {actions.feedbackCount ?
          <div className="tag feedback-color">
              <i className="icon icon-star"/>
              <span>{actions.feedbackCount}</span>
          </div>
          : ''
        }
        {actions.pollCount ?
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
