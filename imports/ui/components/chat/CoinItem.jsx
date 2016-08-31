import React from 'react';

export default class CoinItem extends React.Component {
  constructor(props) {
    super(props);
  }

  donateMoney(number) {
    // Meteor.call('polls.vote', this.props.poll._id, propositionId);
  }

  render() {
    const {
      coin,
    } = this.props;
    return (
      <div>
        <div>
          <div> Nouveau Coinz! </div>
          <p>But : {coin.purpose}</p>
          {coin.totalEarned}/{coin.goal} reçu
        </div>
      </div>
    );
  }
}
