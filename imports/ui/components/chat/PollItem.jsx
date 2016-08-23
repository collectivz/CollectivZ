import React from 'react';

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

    const propositionNodes = propositions.map(function(proposition) {
      const percentage = proposition.voteRecevedFrom.length / poll.totalVote * 100 || 0;
      return (
        <div key={proposition._id}>
          {proposition.name} {percentage} % de vote recus <button onClick={this.voteForAPoll.bind(this, proposition._id)}>Vote pour ce choix</button>
        </div>
      );
    }, this);
    return (
      <div className="message-wrapper">
        <div className="text">
          <p>{poll.question}</p>
          {propositionNodes}
        </div>
      </div>
    );
  }
}
