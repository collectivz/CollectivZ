import React from 'react';

import { Toast } from '../helpers/Toast.js';
import { closeModal } from '../helpers/Modal';

export default class UsernameEdit extends React.Component {

  constructor(props) {
    super(props);

    this.editUsername = this.editUsername.bind(this);
  }

  editUsername(e) {
    e.preventDefault();
    const {
      user,
    } = this.props;
    const newUsername = this.refs.newUsername.value;

    if (newUsername.length > 0) {
      Meteor.call('users.setUsername', newUsername, (err) => {
        if (err) {
          Toast(err.reason, 'danger');
        } else {
          Toast("Nom d'utilisateur modifié avec succès", 'success');
          closeModal();
        }
      });
    } else {
      Toast("Vous devez entrer un nom d'utilisateur", 'danger');
    }
  }

  render() {
    const {
      user,
    } = this.props;

    return (
      <div>
        <form id="box" onSubmit={this.editUsername}>

          <fieldset className="large has-icon">
            <input
              className="large"
              type="text"
              ref="newUsername"
              defaultValue={user.username}
            />
          </fieldset>
          <fieldset className="large has-icon">
            <input type="submit" value="Modifier" className="large big primary button" />
          </fieldset>

        </form>

      </div>
    );
  }
}
