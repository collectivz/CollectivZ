import React from 'react';

import { Toast } from '../helpers/Toast';
import { closeModal } from '../helpers/Modal';

export default class ContactInvite extends React.Component {

  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const userInvited = this.refs.userInvited.value;

    if (userInvited) {
      Meteor.call('repertory.sendInvite', userInvited, (err, res) => {
        if (err) {
          Toast(err.reason, "danger");
        } else {
          Toast(`Une invitation a été envoyé.`, "success");
          closeModal();
        }
      });
      this.refs.userInvited.value = '';
    }
  }

  render() {

        return (
          <div>
            <form id="box" onSubmit={this.handleSubmit}>

              <fieldset className="large has-icon">
                <input
                  className="large"
                  type="text"
                  ref="userInvited"
                  placeholder="Entrez le nom du contact à inviter"
                />
              </fieldset>
              <fieldset className="large has-icon">
                <input type="submit" value="Inviter" className="large big primary button"/>
              </fieldset>

            </form>

          </div>
        );
  }
}
