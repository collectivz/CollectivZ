import React from 'react';
import './PollItem.css';

export default class PollItem extends React.Component {
  constructor(props) {
    super(props);
  }

  voteForAPoll(propositionId) {
    Meteor.call('polls.vote', this.props.poll._id, propositionId);
  }

  render() {
    const {
      poll,
      propositions
    } = this.props;

    const propositionNodes = propositions.map(function(proposition, i) {
      const percentage = proposition.voteRecevedFrom.length / poll.totalVote * 100 || 0;
      return (
        <div className="poll-prop" key={proposition._id}>
          <p><span className="poll-prop-count">{i})</span>{proposition.name}</p>
          <p className="poll-percent">{percentage} % de vote recus</p>
          <button onClick={this.voteForAPoll.bind(this, proposition._id)}>Vote pour ce choix</button>
        </div>
      );
    }, this);
    return (
      <div className="message-wrapper poll-item">
        <div className="poll-pie">
          <i className="fa fa-pie-chart"></i>
        </div>
        <div>
          <p>Nouveau Pollz !</p>
          <p className="poll-title">{poll.question}</p>
          {propositionNodes}
        </div>
      </div>
    );
  }
}
