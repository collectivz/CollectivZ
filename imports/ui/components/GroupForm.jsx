import React from "react";

import { Toast } from "../helpers/Toast";
import { closeModal } from "../helpers/Modal";

export default class GroupForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isPublic: true
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.togglePrivacy = this.togglePrivacy.bind(this);
  }

  togglePrivacy() {
    this.setState({
      isPublic: !this.state.isPublic
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    const {
      group
    } = this.props;
    const {
      isPublic
    } = this.state;

    const newGroup = {
      name: this.refs.name.value,
      description: this.refs.description.value,
      private: !isPublic
    };

    if (newGroup.name.length) {
      if (!group) {
        Meteor.call("groups.insert", newGroup, (err, res) => {
          if (err) {
            Toast(err.reason, "danger");
          } else {
            Toast(`Groupe "${newGroup.name}" créé.`, "success");
            closeModal();
          }
        });
      } else {
        Meteor.call("channels.edit", group._id, newGroup, (err, res) => {
          if (err) {
            Toast(err.reason, "danger");
          } else {
            Toast(`Groupe "${group.name}" modifié.`, "success");
            closeModal();
          }
        });
      }
      this.refs.name.value = "";
      this.refs.description.value = "";
    }
  }

  render() {
    const {
      group
    } = this.props;
    const {
      isPublic
    } = this.state;

    const nameAttributes = group
      ? { defaultValue: group.name }
      : { placeholder: "Entrez le nom de votre groupe" };

    const descriptionAttributes = group
      ? { defaultValue: group.description }
      : { placeholder: "Vous pouvez ajouter une description (optionnel)" };

    return (
      <div>
        <form id="box" onSubmit={this.handleSubmit}>

          <fieldset className="large">
            <input
              className="large"
              type="text"
              ref="name"
              {...nameAttributes}
            />
          </fieldset>
          <fieldset className="large">
            <textarea
              className="large"
              type="text"
              ref="description"
              {...descriptionAttributes}
            />
          </fieldset>
          <fieldset className="large">
            <input
              type="radio"
              name="gender"
              value="private"
              checked={!isPublic}
              onChange={this.togglePrivacy}
            />
            {" "}Privé
            <input
              type="radio"
              name="gender"
              value="public"
              checked={isPublic}
              onChange={this.togglePrivacy}
            />
            {" "}Public{" "}
            <br />
          </fieldset>
          <input
            type="submit"
            value="Valider"
            className="large success button"
          />

        </form>

      </div>
    );
  }
}
