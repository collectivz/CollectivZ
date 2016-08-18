import React from 'react';

export default class PollItem extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    const { pollId } = this.props;
    const poll = Polls.findOne(pollId);
    const propositions = Propositions.find({pollId : pollId}).fetch();

    console.log(propositions);
    return (
      <div>

      </div>
    );
  }
}
