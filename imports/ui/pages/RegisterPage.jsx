import React from 'react';

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
      errors.push("Entrez un nom d'utilisateur.");
    }
    if (!email) {
      errors.push("Entrez un email.");
    }
    if (!mailRegex.test(email)) {
      errors.push("Entrez un email valide.");
    }
    if (!password || !passwordAgain) {
      errors.push("Entrez et confirmez votre mot de passe.");
    }
    if (password.length < 6) {
      errors.push("Votre mot de passe est trop court.")
    }
    if (password !== passwordAgain) {
      errors.push("Le mot de passe ne correspond pas à la confirmation.")
    }

    if (errors.length) {
      this.setState({
        errors
      });
    } else {
      Accounts.createUser({email, username, password}, (err) => {
        if (err) {
          this.setState({
            errors: [err.reason]
          });
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
      <div>
        <form id="box" onSubmit={this.handleSubmit}>
          <div className="inner">
            <input
              type="text"
              placeholder="Username"
              ref="username"
            />
            <input
              type="text"
              placeholder="Email"
              ref="email"
            />
            <input
              type="password"
              placeholder="Password"
              ref="password"
            />
            <input
              type="password"
              placeholder="Password"
              ref="passwordAgain"
            />
            <input type="submit" value="Register" />
          </div>

        </form>

      </div>
    );
  }
}

RegisterPage.contextTypes = {
  router: React.PropTypes.object
};
