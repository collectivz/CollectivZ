import React from 'react';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';


export default class CoinItem extends React.Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    let number = this.refs.number.value;
    if (number > 0) {
      Meteor.call('coins.donate', this.props.coin._id, number);
      this.refs.number.value = '';
    }
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
        <form onSubmit={this.handleSubmit}>
          <input
            type="number"
            ref="number"
          />
          <input type="submit" value="Financer" />
        </form>
      </div>
    );
  }
}
