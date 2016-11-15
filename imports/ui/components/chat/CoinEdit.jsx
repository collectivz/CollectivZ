import React from 'react';

import { Toast } from '../../helpers/Toast';
import { closeModal } from '../../helpers/Modal';

export default class CoinEdit extends React.Component {

  constructor(props) {
    super(props);

    this.editCoin = this.editCoin.bind(this);
  }

  editCoin(e) {
    e.preventDefault();

    const {
      coin
    } = this.props;

    const newCoin = {
      purpose: this.refs.purpose.value,
      goal: parseInt(this.refs.goal.value),
    };

    if (newCoin.goal > 0) {
      Meteor.call('coins.edit', coin._id, newCoin, (err, res) => {
        if (err) {
          Toast(err.reason, "danger");
        } else {
          closeModal();
          Toast("Modifications prises en compte.", "success");
        }
      });
    } else {
      Toast("Vous devez entrer un nombre positif.", "danger");
    }
  }

  render() {
    const {
      coin
    } = this.props;

    return (
      <div>
        <form id="box" onSubmit={this.editCoin}>

          <fieldset className="large">
            <input
              className="large"
              type="text"
              ref="purpose"
              defaultValue={coin.purpose}
            />
          </fieldset>
          <fieldset className="large">
            <input
              className="large"
              type="number"
              ref="goal"
              defaultValue={coin.goal}
            />
          </fieldset>
          <fieldset className="large">
            <input type="submit" value="Modifier" className="large success button"/>
          </fieldset>

        </form>

      </div>
    );
  }
}
