import React, { Component, PropTypes }    from 'react';
import { Meteor }                         from 'meteor/meteor';

import AppNav                             from '../components/AppNav.jsx';
import TopNav                             from '../components/TopNav.jsx';

export default class AdminPage extends Component {

  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const guildName = this.refs.guildName.value;

    if (guildName) {
      Meteor.call('guilds.insert', guildName);
      this.refs.guildName.value = '';
    }
  }

  render() {

    const { user } = this.props;

    return (
      <div className="screen-box">
        <TopNav text="Config admin"/>
          <div className="sub-container center">
            <div className="center-wrapper admin">
              <i className="big-icon icon icon-2x icon-temple"/>
              <h5>Créer une nouvelle guilde</h5>
              <form className="merged">
                <input
                  type="text"
                  className="small"
                  placeholder="Nom de la guilde"
                  ref="guildName"
                />
                <button onClick={this.handleSubmit} className="small button primary">
                  <span>Ajouter</span>
                </button>
              </form>
            </div>
          </div>
        <AppNav user={user} />
      </div>
    );
  }
}
