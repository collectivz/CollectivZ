import React from 'react';

import { Toast } from '../helpers/Toast';

export default class InformationsEdit extends React.Component {

  constructor(props) {
    super(props);

    this.updateInfo = this.updateInfo.bind(this);
  }

  updateInfo(e) {
    e.preventDefault();

    const user = {
      username: this.refs.username.value,
      firstname: this.refs.firstname.value,
      lastname: this.refs.lastname.value,
      email: this.refs.email.value,
      phone: this.refs.phone.value,
    };
    const oldPassword = this.refs.oldPassword.value;
    const newPassword = this.refs.newPassword.value;

    if (!oldPassword) {
      Toast('Vous devez renseigner votre mot de passe', "danger");
    } else {
      if (newPassword) {
        Accounts.changePassword(oldPassword, newPassword, err => {
          if (err) {
            Toast(err.reason, 'danger');
          }
        });
      }

    }
  }

  render() {
    return (
      <div>
        <form id="box" onSubmit={this.updateInfo}>
          <fieldset className="large">
            <input
              className="large"
              type="text"
              ref="username"
              placeholder="Nom d'utilisateur"
            />
          </fieldset>
          <fieldset className="large">
            <input
              className="large"
              type="text"
              ref="firstname"
              placeholder="Prénom"
            />
          </fieldset>
          <fieldset className="large">
            <input
              className="large"
              type="text"
              ref="lastname"
              placeholder="Nom"
            />
          </fieldset>
          <fieldset className="large">
            <input
              className="large"
              type="text"
              ref="email"
              placeholder="Email"
            />
          </fieldset>
          <fieldset className="large">
            <input
              className="large"
              type="text"
              ref="phone"
              placeholder="Numéro de téléphone"
            />
          </fieldset>
          <fieldset className="large has-icon">
            <input
              className="large"
              type="text"
              ref="oldPassword"
              placeholder="Ancien mot de passe"
            />
          </fieldset>
          <fieldset className="large has-icon">
            <input
              className="large"
              type="password"
              ref="newPassword"
              placeholder="Nouveau mot de passe"
            />
          </fieldset>
          <fieldset className="large has-icon">
            <input type="submit" value="Modifier" className="large big success button"/>
          </fieldset>
        </form>

      </div>
    );
  }
}
