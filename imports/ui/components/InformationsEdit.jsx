import React from 'react';

import Breadcrumb from './Breadcrumb';
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
      Meteor.call('users.changeInfos', user, (err, res) => {
        if (err) {
          Toast(err.reason, 'danger');
        } else {
          Toast('Modifications prises en compte', "success");
        }
      });
    }
  }

  render() {
    const {
      user
    } = this.props;

    const firstnameAttribute = user.profile.firstName
      ? { defaultValue: user.profile.firstName }
      : { placeholder: 'Prénom' };
    const lastnameAttribute = user.profile.lastName
      ? { defaultValue: user.profile.lastName }
      : { placeholder: 'Nom' };
    const emailAttribute = user.emails[0].address
      ? { defaultValue: user.emails[0].address }
      : { placeholder: 'Email' };
    const phoneAttribute = user.phone
      ? { defaultValue: user.phone }
      : { placeholder: 'Numéro de téléphone' };

    return (
      <div className="sub-container page">
        <Breadcrumb title="Mes informations personnelles" hasBack={true} />
        <form id="box" onSubmit={this.updateInfo}>
          <div className="header">
            <i className="big-center-icon icon icon-info"></i>
            <h4>Modifier mes infos</h4>
          </div>
          <div className="content">
            <fieldset className="large">
              <label><i className="icon icon-user"></i>Nom d'utilisateur</label>
              <input
                className="large"
                type="text"
                ref="username"
                defaultValue={user.username}
                />
            </fieldset>
            <fieldset className="large">
              <label><i className="icon icon-user"></i>Prénom</label>
              <input
                className="large"
                type="text"
                ref="firstname"
                {...firstnameAttribute}
                />
            </fieldset>
            <fieldset className="large">
              <label><i className="icon icon-user"></i>Nom</label>
              <input
                className="large"
                type="text"
                ref="lastname"
                {...lastnameAttribute}
                />
            </fieldset>
            <fieldset className="large">
              <label><i className="icon icon-user"></i>Email</label>
              <input
                className="large"
                type="text"
                ref="email"
                {...emailAttribute}
              />
            </fieldset>
            <fieldset className="large">
              <label><i className="icon icon-user"></i>Téléphone (optionnel)</label>
              <input
                className="large"
                type="text"
                ref="phone"
                {...phoneAttribute}
              />
            </fieldset>
            <fieldset className="large merge">
              <label><i className="icon icon-lock"></i>Mot de passe</label>
              <input
                className="large"
                type="password"
                ref="oldPassword"
                placeholder="Ancien mot de passe"
                />
              <input
                className="large"
                type="password"
                ref="newPassword"
                placeholder="Nouveau mot de passe"
                />
            </fieldset>
            <fieldset className="large">
              <input type="submit" value="Modifier" className="large big success button"/>
            </fieldset>
          </div>
        </form>

      </div>
    );
  }
}
