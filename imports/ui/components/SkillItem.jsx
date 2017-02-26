import React from "react";

import { Toast } from "../helpers/Toast";

export default class SkillItem extends React.Component {
  removeSkill(skill, e) {
    e.preventDefault();

    if (skill) {
      Meteor.call("users.removeSkill", skill, (err, res) => {
        if (!err) {
          Toast(`Compétence ${skill} enlevée.`, "success");
        } else {
          Toast(err.reason, "danger");
        }
      });
    }
  }

  render() {
    const {
      data
    } = this.props;

    return (
      <div className="list-item small no-image">
        <div className="list-item-content">
          <p className="title">{data}</p>
        </div>
        <div className="list-item-action">
          <button
            className="button only-icon danger"
            onClick={this.removeSkill.bind(this, data)}
          >
            <i className="icon icon-cross" />
          </button>
        </div>
      </div>
    );
  }
}
