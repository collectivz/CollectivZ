import React from 'react';

import { Toast } from '../../helpers/Toast';
import { closeModal } from '../../helpers/Modal';

export default class ActionEdit extends React.Component {

  constructor(props) {
    super(props);

    this.editAction = this.editAction.bind(this);
  }

  editAction(e) {
    e.preventDefault();

    const {
      channel
    } = this.props;

    const newChannel = {
      name: this.refs.name.value,
      description: this.refs.description.value,
    };

    Meteor.call('channels.edit', channel._id, newChannel, (err, res) => {
      if (err) {
        Toast(err.reason, "danger");
      } else {
        closeModal();
        Toast("Modifications prises en compte.", "success");
      }
    });
  }

  render() {
    const {
      channel
    } = this.props;

    return (
      <div>
        <form id="box" onSubmit={this.editAction}>

          <fieldset className="large has-icon">
            <input
              className="large"
              type="text"
              ref="name"
              defaultValue={channel.name}
            />
          </fieldset>
          <fieldset className="large has-icon">
            <input
              className="large"
              type="text"
              ref="description"
              defaultValue={channel.description}
            />
          </fieldset>
          <fieldset className="large has-icon">
            <input type="submit" value="Modifier" className="large big primary button"/>
          </fieldset>

        </form>

      </div>
    );
  }
}
