import React from 'react';

import ToastrStack from '../components/ToastrStack.jsx';
import { Toast } from '../helpers/Toast';

export default class RegisterPage extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      errors: []
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    const errors = [];
    const mailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const username = this.refs.username.value;
    const email = this.refs.email.value;
    const password = this.refs.password.value;
    const passwordAgain = this.refs.passwordAgain.value;

    e.preventDefault();

    if (!username) {
      Toast("Entrez un nom d'utilisateur.", 'danger');
    }
    if (!email) {
      Toast("Entrez un email.", 'danger');
    }
    if (!mailRegex.test(email)) {
      Toast("Entrez un email valide.", 'danger');
    }
    if (!password || !passwordAgain) {
      Toast("Entrez et confirmez votre mot de passe.", 'danger');
    }
    if (password.length < 6) {
      Toast("Votre mot de passe est trop court.", 'danger');
    }
    if (password !== passwordAgain) {
      Toast("Le mot de passe ne correspond pas à la confirmation.", 'danger');
    }

    if (errors.length) {
      this.setState({
        errors
      });
    } else {
      Accounts.createUser({email, username, password}, (err) => {
        if (err) {
          console.log(err);
          Toast(err.reason, 'danger');
        } else {
          Meteor.loginWithPassword(username, password, (err) => {
            if (!err) {
              this.context.router.push('/my-groups');
            }
          })
        }
      });
    }
  }

  render() {
    return (
      <div className="login screen-box center register">
        <div className="center-wrapper">
          <form id="box" onSubmit={this.handleSubmit}>
            <img src="/img/login_logo.svg" width="64" height="64" />
            <h2>Collectivz</h2>
            <h5>Refaire le monde est donné à tout le monde</h5>
            <fieldset className="large has-icon">
              <i className="icon icon-user"></i>
              <input
                className="large"
                type="text"
                placeholder="Nom d'utilisateur"
                ref="username"
              />
            </fieldset>
            <fieldset className="large has-icon">
              <i className="icon icon-envelope"></i>
              <input
                className="large"
                type="text"
                placeholder="Email"
                ref="email"
              />
            </fieldset>
            <fieldset className="large has-icon">
              <i className="icon icon-phone"></i>
              <input
                className="large"
                type="tel"
                placeholder="Téléphone (optionnel)"
                ref="phone"
                pattern="^((\+\d{1,3}(-| )?\(?\d\)?(-| )?\d{1,5})|(\(?\d{2,6}\)?))(-| )?(\d{3,4})(-| )?(\d{4})(( x| ext)\d{1,5}){0,1}$"
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
            <fieldset className="large has-icon">
              <i className="icon icon-lock"></i>
              <input
                className="large"
                type="password"
                placeholder="Confirmation mot de passe"
                ref="passwordAgain"
              />
            <input type="submit" value="S'enregister" className="large big success button"/>
            </fieldset>
          </form>
          <div className="extra-content">
            <a className="lost-password" href="/login"> Déjà inscrit ? </a>
          </div>
        </div>
        <ToastrStack />

      </div>
    );
  }
}

RegisterPage.contextTypes = {
  router: React.PropTypes.object
};
