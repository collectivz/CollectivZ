import React from 'react';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import './CoinItem.css'

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
      <div className="message-wrapper coinz-item">
        <div className="coinz-pie">
          <i className="fa fa-eur"></i>
        </div>
        <div>
          <p>Nouveau Coinz !</p>
          <p className="coinz-title">{coin.purpose}</p>
        </div>
        <div className="coinz-prop">
          <p className="coinz-percent">{coin.totalEarned}/{coin.goal} reçu</p>
        <form onSubmit={this.handleSubmit}>
          <input
            type="number"
            ref="number"
          />
          <input type="submit" value="Financer" />
        </form>
        </div>
      </div>
    );
  }

}
