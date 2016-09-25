import React, { Component, PropTypes }    from 'react';
import { Meteor }                         from 'meteor/meteor';

import AppNav                             from '../components/AppNav.jsx';
import List                             from '../components/List.jsx';
import Breadcrumb                             from '../components/Breadcrumb.jsx';

export default class AdminPage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      userNumber: 0,
      coinTotal: "Le montant total s'affichera quand vous aurez entré une valeur."
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.getTotal = this.getTotal.bind(this);
    this.addMoney = this.addMoney.bind(this);
    this.addAdmin = this.addAdmin.bind(this);
  }

  componentDidMount() {
    Meteor.call('users.getUserNumber', (err, res) => {
      this.setState({
        userNumber: res
      });
    });
  }

  addAdmin(e) {
    e.preventDefault();
    const adminName = this.refs.adminName.value;

    if (adminName.length > 0) {
      Meteor.call('admin.addAdmin', adminName, (err, res) => {
        if (!err) {
          this.refs.adminName.value = '';
        }
      });
    }

  }

  getTotal() {
    const { userNumber } = this.state;
    const amount = parseInt(this.refs.amount.value);
    const coinTotal = amount > 0
      ? `Cela représente un total de ${userNumber * amount}`
      : "Entrez une valeur supérieure à 0."

    this.setState({
      coinTotal
    });
  }

  addMoney(e) {
    e.preventDefault();
    const amount = parseInt(this.refs.amount.value);

    if (amount > 0) {
      Meteor.call('admin.addMoney', amount, (err, res) => {
        if (!err) {
          this.refs.amount.value = '';
        }
      });
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    const guildName = this.refs.guildName.value;

    if (guildName) {
      Meteor.call('groups.insert', {name: guildName});
      this.refs.guildName.value = '';
    }
  }

  render() {

    const { user, admins } = this.props;
    const { userNumber, coinTotal } = this.state;

    return (
      <div className="screen-box">
        <Breadcrumb title="Coordination" hasBack={false} />
          <div className="sub-container center">
            <div className="center-wrapper admin">
              <i className="big-icon icon icon-2x icon-temple"/>
              <h5>Créer un nouveau groupe</h5>
              <form className="merged">
                <input
                  type="text"
                  className="small"
                  placeholder="Nom du groupe"
                  ref="guildName"
                />
                <button onClick={this.handleSubmit} className="small button primary">
                  <span>Ajouter</span>
                </button>
              </form>
              <h5>Ajouter des points</h5>
              <form className="merged">
                <input
                  type="number"
                  className="small"
                  min="0"
                  placeholder="Montant par membre"
                  ref="amount"
                  onChange={this.getTotal}
                />
                <button onClick={this.addMoney} className="small button primary">
                  <span>Ajouter</span>
                </button>
                <br />
                <span>{coinTotal}</span>
              </form>
              <h5>Ajouter un coordinateur</h5>
              <form className="merged">
                <input
                  type="text"
                  className="small"
                  placeholder="Nom du coordinateur"
                  ref="adminName"
                />
                <button onClick={this.addAdmin} className="small button primary">
                  <span>Ajouter</span>
                </button>
              </form>
              <h5>Liste des coordinateurs</h5>
              <List data={admins} type='admin'/>
            </div>
          </div>
        <AppNav user={user} />
      </div>
    );
  }
}
