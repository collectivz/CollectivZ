import React            from 'react';
import { Meteor }       from 'meteor/meteor';
import { check }        from 'meteor/check';

import DropDownBottom from '../DropDownBottom';
import CoinEdit from './CoinEdit';
import AvatarRowContainer from '../../containers/AvatarRowContainer';
import { Toast }         from '../../helpers/Toast';
import { openModal }         from '../../helpers/Modal';

export default class CoinItem extends React.Component {

  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.openEdit = this.openEdit.bind(this);
    this.deleteCoin = this.deleteCoin.bind(this);
  }

  openEdit() {
    const {
      coin
    } = this.props;
    const component = <CoinEdit coin={coin} />;
    openModal(component, "Modifier le financement");
  }

  deleteCoin() {
    const {
      coin
    } = this.props;

    Meteor.call('coins.delete', coin._id);
  }

  handleSubmit(e) {
    e.preventDefault();
    const { coin } = this.props;
    const { number } = this.refs;
    let numberInt = parseInt(number.value);
    if (Number.isInteger(numberInt) && numberInt > 0) {
      Meteor.call('coins.donate', this.props.coin._id, numberInt, (err, res) => {
        if (err) {
          Toast(err.reason, "danger");
        }
      });
      this.refs.number.value = '';
    }
  }

  getAuthorName(id) {
    const author = Meteor.users.findOne(id);

    return author ? author.username : '';
  }

  render() {

    const { coin, user } = this.props;

    return (
      <div className="chat-special-bubble chat-special-bubble-coin">
          <div className="bubble-content">
              <div className="bubble-header">
                <i className="icon icon-money-color icon-euro"/>
                <span>{this.getAuthorName.bind(this, coin.author)} à lancé une collecte</span>
                <h5>{coin.purpose}</h5>
                {
                  (coin.author === user._id || user.isAdmin) ?
                    <DropDownBottom>
                      <ul>
                        <li><a className="drop-down-menu-link" onClick={this.deleteCoin}> Supprimer le financement </a></li>
                        <li><a className="drop-down-menu-link" onClick={this.openEdit}> Modifier le financement </a></li>
                      </ul>
                    </DropDownBottom>
                  : ''
                }
              </div>
              <div className="bubble-content-text">
                <h4 className="success-text">{coin.totalEarned} / {coin.goal} reçu</h4>
                <h5>Donner &nbsp;
                    <input
                      className="small"
                      type="number"
                      ref="number"
                    /> € de mes <span className="success-text">{user.coinz} €</span>
                </h5>
                <button className="success button" onClick={this.handleSubmit}>
                  Financer
                </button>
                <AvatarRowContainer userIds={coin.givers} />
              </div>

          </div>
      </div>
    );
  }

}
