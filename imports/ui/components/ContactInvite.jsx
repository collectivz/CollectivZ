import { Meteor } from 'meteor/meteor';
import React from 'react';
import { _ } from 'meteor/underscore';

import { Toast } from '../helpers/Toast';
import { closeModal } from '../helpers/Modal';

export default class ContactInvite extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      userList: []
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = _.debounce(this.handleChange.bind(this), 1000);
  }

  handleChange(e) {
    const username = this.refs.userInvited.value;

    Meteor.call('users.getUsernames', username, (err, res) => {
      if (!err) {
        this.setState({
          userList: res
        });
      }
    });
  }

  setUsername(username) {
    this.refs.userInvited.value = username;
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
    const { userList } = this.state;

        return (
          <div>
            <form id="box" onSubmit={this.handleSubmit}>

              <fieldset className="large has-icon">
                <i className="icon icon-user"></i>
                <input
                  className="large"
                  type="text"
                  ref="userInvited"
                  placeholder="Entrez le nom du contact à inviter"
                  onChange={this.handleChange}
                />
              </fieldset>
              { userList && userList.length > 0 ?
                  <div>
                    {userList.map(user => {
                      return <p key={user._id} onClick={this.setUsername.bind(this, user.username)}>{user.username}</p>;
                    })}
                  </div>
                : ''
              }
              <fieldset className="large has-icon">
                <input type="submit" value="Inviter" className="large success button"/>
              </fieldset>

            </form>

          </div>
        );
  }
}
