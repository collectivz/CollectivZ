import React            from 'react';

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
        <div key={proposition._id}>
          <p>
            <span >{i}</span> {proposition.name}
          </p>
          <p>
            {percentage} % de vote recus
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
