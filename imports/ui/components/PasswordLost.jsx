import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import classNames from 'classnames';

import { Toast } from '../helpers/Toast';

export default class PasswordLost extends Component {

  constructor(props) {
    super(props);

    this.state = { isClicked: false };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    e.preventDefault();
    this.setState({ isClicked: true });

    setTimeout(() => {
      this.setState({ isClicked: false });
      const email = this.refs.email.value;

      if (email) {
        Meteor.call('users.lostPassword', email, (err, res) => {
          if (err) {
            Toast(err.reason, 'danger');
          } else {
            Toast('Un email contenant le nouveau mot de passe va vous être envoyé.', 'success');
            this.refs.email.value = '';
          }
        });
      }
    }, 500);
  }

  render() {
    return (
      <div className="login screen-box center">
        <div className="center-wrapper">
          <form>
            <img src="/img/login_logo.svg" width="64" height="64" />
            <h2>Collectivz</h2>
            <h5>Refaire le monde est donné à tout le monde</h5>
            <fieldset className="large has-icon name">
              <i className="icon icon-mail" />
              <input
                className="large"
                type="text"
                placeholder="Email"
                ref="email"
              />
            </fieldset>
            <button onClick={this.handleClick} className={classNames('large big success button spinner touch-event', { 'touch-active spinner-active': this.state.isClicked })}>
              <div className="icon-spin" />
              <span>Réinitialiser le mot de passe</span>
            </button>
          </form>
          <div className="extra-content">
            <div className="error">
              <i className="icon icon-error" />
              <span>ErrorCode</span>
            </div>
            <a className="lost-password" href="/login"> Se connecter </a>
            <a className="subscription" href="/register"><i className="icon icon-chevron-right" /> Pas encore inscrit ?            </a>
          </div>
        </div>
      </div>
    );
  }
}
