import React from 'react';

import { Toast } from '../helpers/Toast';
import { closeModal } from '../helpers/Modal';

export default class GroupForm extends React.Component {

  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    const {
      group
    } = this.props;
    const newGroup = {
      name: this.refs.name.value,
      description: this.refs.description.value
    };

    if (newGroup.name.length) {
      if (!group) {
        Meteor.call('groups.insert', newGroup, (err, res) => {
          if (err) {
            Toast(err.reason, "danger");
          } else {
            Toast(`Groupe "${newGroup.name}" créé.`, "success");
            closeModal();
          }
        });
      } else {
        Meteor.call('channels.edit', group._id, newGroup, (err, res) => {
          if (err) {
            Toast(err.reason, "danger");
          } else {
            Toast(`Groupe "${group.name}" modifié.`, "success");
            closeModal()
          }
        });
      }
      this.refs.name.value = '';
      this.refs.description.value = '';
    }
  }

  render() {
    const {
      group
    } = this.props;

    const nameAttributes = group ? { defaultValue: group.name }
      : { placeholder: "Entrez le nom de votre groupe" };

    const descriptionAttributes = group ? { defaultValue: group.description }
      : { placeholder: "Vous pouvez ajouter une description (optionnel)" };

    return (
      <div>
        <form id="box" onSubmit={this.handleSubmit}>

          <fieldset className="large has-icon">
            <input
              className="large"
              type="text"
              ref="name"
              { ...nameAttributes }
            />
          </fieldset>
          <fieldset className="large has-icon">
            <input
              className="large"
              type="text"
              ref="description"
              { ...descriptionAttributes }
            />
          </fieldset>
          <fieldset className="large has-icon">
            <input type="submit" value="Valider" className="large big primary button"/>
          </fieldset>

        </form>

      </div>
    );
  }
}
