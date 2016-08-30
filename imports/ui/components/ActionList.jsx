import React from 'react';

export default class ActionList extends React.Component {

  render() {
    const {
      actions
    } = this.props;

    return (
      <div>
        {actions.pollCount ?
          <div>
            <i className="fa fa-pie-chart" aria-hidden="true">{actions.pollCount}</i>
          </div>
          : ''
        }
        {actions.chanCount ?
          <div>
            <i className="fa fa-cogs" aria-hidden="true">{actions.chanCount}</i>
          </div>
          : ''
        }
        {actions.beerCount ?
          <div>
            <i className="fa fa-calendar" aria-hidden="true">{actions.beerCount}</i>
          </div>
          : ''
        }
        {actions.feedbackCount ?
          <div>
            <i className="fa fa-star-o" aria-hidden="true">{actions.feedbackCount}</i>
          </div>
          : ''
        }
      </div>
    );
  }
}
