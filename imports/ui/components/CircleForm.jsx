import React from 'react';

import List from './List';
import UserItem from './UserItem';
import { Toast } from '../helpers/Toast';
import { closeModal } from '../helpers/Modal';

export default class CircleForm extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      newCircle: props.circle ? props.circle.members : [],
    };

    this.addToCircle = this.addToCircle.bind(this);
    this.removeFromCircle = this.removeFromCircle.bind(this);
    this.createCircle = this.createCircle.bind(this);
    this.editCircle = this.editCircle.bind(this);
    this.addToCircle = this.addToCircle.bind(this);
    this.removeFromCircle = this.removeFromCircle.bind(this);
  }

  addToCircle(userSelectedId, e) {
    e.preventDefault();
    const {
      newCircle
    } = this.state;
    if (_.contains(newCircle, userSelectedId)) {
      Toast('Vous avez déjà ajouté cette personne.', 'danger');
    } else {
      this.setState({
        newCircle: newCircle.concat(userSelectedId),
      });
    }
  }

  removeFromCircle(userSelectedId, e) {
    e.preventDefault();
    const {
      newCircle
    } = this.state;
    const index = newCircle.indexOf(userSelectedId);
    if (index >= 0) {
      let newCircle = newCircle;
      newCircle.splice(index, 1);
      this.setState({
        newCircle,
      });
    }
  }

  createCircle(e) {
    e.preventDefault();
    const {
      newCircle
    } = this.state;
    const circleName = this.refs.circleName.value;

    if (circleName.length && newCircle.length) {
      Meteor.call('circles.insert', newCircle, circleName, (err, res) => {
        if (err) {
          Toast(err.reason, "danger");
        } else {
          Toast(`Le cercle a bien été créé.`, "success");
          closeModal();
        }
      });
    } else if (circleName.length === 0) {
      Toast("Vous devez renseigner un nom d'équipe.", "danger");
    } else if (newCircle.length === 0) {
      Toast("Vous ne pouvez créer une équipe vide", "danger");
    }
  }

  editCircle(e) {
    e.preventDefault();
    const circleName = this.refs.circleName.value;
    const {
      circle
    } = this.props;
    const {
      newCircle
    } = this.state;

    if (circleName.length && newCircle.length) {
      Meteor.call('circles.edit', circle._id, newCircle, circleName, (err, res) => {
        if (err) {
          Toast(err.reason, "danger");
        } else {
          Toast(`Le cercle a bien été créé.`, "success");
          closeModal();
        }
      });
    } else if (circleName.length === 0) {
      Toast("Vous devez renseigner un nom d'équipe.", "danger");
    } else if (newCircle.length === 0) {
      Toast("Vous ne pouvez créer une équipe vide", "danger");
    }
  }

  render() {
    const {
      circle,
      usersContact
    } = this.props;

    const nameAttributes = circle ? { defaultValue: circle.name }
      : { placeholder: "Entrez le nom du groupe" };
    const method = circle ? this.editCircle : this.createCircle;
    const buttonValue = circle ? 'Modifier' : 'Créer';

    return (
      <form onSubmit={method}>

        <fieldset className="large">
          <input
            className="large"
            type="text"
            ref="circleName"
            {...nameAttributes}
          />
        </fieldset>
        <List
          data={usersContact}
          type="createCircle"
          addToCircle={this.addToCircle}
          removeFromCircle={this.removeFromCircle}
          circle={this.state.newCircle}
          emptyListString="Vous n'avez aucun contact à ajouter dans ce cercle."
        >
          <UserItem />
        </List>
        <fieldset className="large">
          <input type="submit" value={buttonValue} className="large success button"/>
        </fieldset>

      </form>

    );
  }
}
