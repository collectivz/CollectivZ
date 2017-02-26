import React from "react";

import { Toast } from "../../helpers/Toast";
import { closeModal } from "../../helpers/Modal";

export default class PollEdit extends React.Component {
  constructor(props) {
    super(props);

    this.editPoll = this.editPoll.bind(this);
  }

  editPoll(e) {
    e.preventDefault();

    const {
      poll
    } = this.props;

    const newQuestion = this.refs.question.value;

    Meteor.call("polls.editQuestion", poll._id, newQuestion, (err, res) => {
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
      poll
    } = this.props;

    return (
      <div>
        <form id="box" onSubmit={this.editPoll}>

          <fieldset className="large">
            <input
              className="large"
              type="text"
              ref="question"
              defaultValue={poll.question}
            />
          </fieldset>
          <fieldset className="large">
            <input
              type="submit"
              value="Modifier"
              className="large success button"
            />
          </fieldset>

        </form>

      </div>
    );
  }
}
