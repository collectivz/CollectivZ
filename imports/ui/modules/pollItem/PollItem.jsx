import React from 'react';

export default class PollItem extends React.Component {
  constructor(props) {
    super(props);

    // this.voteForAPoll = this.voteForAPoll.bind(this);
  }

  voteForAPoll(propositionId) {
    console.log("Bonjour");
    Meteor.call('polls.vote', this.props.pollId, propositionId);
  }

  render() {
    const { pollId } = this.props;
    const poll = Polls.findOne(pollId);
    const propositions = Propositions.find({pollId : pollId}).fetch();
    const propositionNodes = propositions.map(function(proposition) {
      return (
        <div key={proposition._id}>
          {proposition.name} <button onClick={this.voteForAPoll.bind(this, proposition._id)}>Vote pour ce choix</button>
        </div>
      );
    }, this);
    return (
      <div >
        {propositionNodes}
      </div>
    );
  }
}
