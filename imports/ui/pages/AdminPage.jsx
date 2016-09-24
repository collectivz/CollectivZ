import React, { Component, PropTypes }    from 'react';
import { Meteor }                         from 'meteor/meteor';

import AppNav                             from '../components/AppNav.jsx';
import Breadcrumb                             from '../components/Breadcrumb.jsx';

export default class AdminPage extends Component {

  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
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

    const { user } = this.props;

    return (
      <div className="screen-box">
        <Breadcrumb title="Coordination" hasBack={false} />
          <div className="sub-container center">
            <div className="center-wrapper admin">
              <i className="big-icon icon icon-2x icon-temple"/>
              <h5>Créer une nouveau groupe</h5>
              <form className="merged">
                <input
                  type="text"
                  className="small"
                  placeholder="Nom de la projet"
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
