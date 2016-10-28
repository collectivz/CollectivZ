import React from 'react';
import { Accounts } from 'meteor/accounts-base';

import { Toast } from '../helpers/Toast.js';
import { closeModal } from '../helpers/Modal';

export default class PasswordEdit extends React.Component {

  constructor(props) {
    super(props);

    this.editPassword = this.editPassword.bind(this);
  }

  editPassword(e) {
    e.preventDefault();
    const oldPassword = this.refs.oldPassword.value;
    const newPassword = this.refs.newPassword.value;

    if (newPassword.length >= 6) {
      Accounts.changePassword(oldPassword, newPassword, (err) => {
        if (err) {
          Toast(err.reason, "danger");
        } else {
          Toast("Mot de passe modifié avec succès", "success");
          closeModal();
        }
      });
    } else {
      Toast("Vous devez entrer un mot de passe de plus de 6 caractères", "danger");
    }
  }

  render() {

    return (
      <div>
        <form id="box" onSubmit={this.editPassword}>

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
              placeholder="Nouveau mot de pass"
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
