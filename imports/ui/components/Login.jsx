import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import classNames                       from 'classnames';

import { Toast }         from '../helpers/Toast';

export default class Login extends Component {

  constructor(props) {
    super(props);

    this.state = { isClicked : false };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {

      e.preventDefault();
      this.setState( { isClicked : true } );

      setTimeout( () => {
          this.setState( { isClicked : false } );
          const username = this.refs.username.value;
          const password = this.refs.password.value;

          if (username && password) {
            Meteor.loginWithPassword(username, password, err => {
              if (err) {
                Toast(err.reason, "danger");
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
            {/*
              <img src="/img/logo.svg" width="64" height="64" />
            */}
            <fieldset className="large has-icon name">
              <i className="icon icon-user"></i>
              <input
                className="large"
                type="text"
                placeholder="Nom d'utilisateur"
                ref="username"
              />
            </fieldset>
            <fieldset className="large has-icon">
              <i className="icon icon-lock"></i>
              <input
                className="large"
                type="password"
                placeholder="Mot de passe"
                ref="password"
              />
            </fieldset>
            <button onClick={ this.handleClick } className={classNames("large big success button spinner touch-event", { "touch-active spinner-active": this.state.isClicked})}>
              <div className="icon-spin"/>
              <span>Se connecter</span>
            </button>
          </form>
          <div className="extra-content">
            <div className="error">
              <i className="icon icon-error"/>
              <span>ErrorCode</span>
            </div>
            <a href="/password"> Mot de passe perdu ? </a>
            <a href="/register"> Inscription </a>
          </div>
        </div>
      </div>
    );
  }
}
