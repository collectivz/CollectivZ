import React            from 'react';

import { Toast }         from '../../helpers/Toast';

export default class PollItem extends React.Component {

  constructor(props) {
    super(props);
  }

  voteForAPoll(propositionId) {
    Meteor.call('polls.vote', this.props.poll._id, propositionId, (err, res) => {
      if (err) {
        Toast(err.reason, "danger");
      }
    });
  }

  render() {
    const {
      poll,
      propositions
    } = this.props;

    const propositionNodes = propositions.map(function(proposition, i) {
      return (
        <div key={proposition._id}>
          <p>
            {proposition.name}
          </p>
          <p>
            {proposition.voteRecevedFrom.length} votes reçus
          </p>
          <button className="primary button" onClick={this.voteForAPoll.bind(this, proposition._id)}>
            Vote pour ce choix
          </button>
        </div>
      );
    }, this);

    return (
      <div className="chat-special-bubble chat-special-bubble-poll">
          <div className="bubble-content">
              <i className="big-icon icon icon-pie-chart"/>
              <div className="bubble-header">
                  <i className="icon icon-pie-chart"/>
                  <span>Nouveau Pollz !</span>
              </div>
              <h3>{poll.question}</h3>
              <div className="poll-choice">{propositionNodes}</div>
          </div>
      </div>
    );
  }
}
