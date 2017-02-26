import React from "react";

import List from "./List";
import SkillItem from "./SkillItem";
import Breadcrumb from "./Breadcrumb";
import { Toast } from "../helpers/Toast";

export default class SkillsEdit extends React.Component {
  constructor(props) {
    super(props);

    this.addSkill = this.addSkill.bind(this);
  }

  addSkill(e) {
    e.preventDefault();
    const skill = this.refs.skill.value;

    if (skill) {
      Meteor.call("users.addSkill", skill, (err, res) => {
        if (!err) {
          Toast(`Compétence ${skill} ajoutée.`, "success");
          this.refs.skill.value = "";
        } else {
          Toast(err.reason, "danger");
        }
      });
    } else {
      Toast("Vous devez renseigner une compétence", "danger");
    }
  }

  render() {
    const {
      user
    } = this.props;

    return (
      <div className="sub-container page">
        <Breadcrumb title="Mes compétences" hasBack />
        <form>
          <div className="header">
            <i className="icon icon-cog" />
            <h4>Mes compétences</h4>
          </div>
          <div className="content">
            <fieldset className="large">
              <input
                className="large"
                type="text"
                placeholder="Entrez une compétence"
                ref="skill"
              />
            </fieldset>
            <button
              className="button self-center success"
              onClick={this.addSkill}
            >
              Ajouter
            </button>
          </div>
        </form>
        <div>
          <List
            data={user.skills}
            emptyListString="Aucune compétence pour le moment."
          >
            <SkillItem />
          </List>
        </div>

      </div>
    );
  }
}
