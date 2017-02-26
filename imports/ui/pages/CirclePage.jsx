import React from "react";

import { openModal } from "../helpers/Modal";
import CircleForm from "../components/CircleForm";
import Breadcrumb from "../components/Breadcrumb.jsx";
import List from "../components/List.jsx";
import CircleItem from "../components/CircleItem.jsx";
import TouchEvent from "../components/TouchEvent.jsx";

export default class CirclePage extends React.Component {
  constructor(props) {
    super(props);

    this.openCircleModal = this.openCircleModal.bind(this);
  }

  openCircleModal(circle, e) {
    const {
      usersContact
    } = this.props;

    if (!e) {
      circle = null;
    }

    const component = (
      <CircleForm circle={circle} usersContact={usersContact} />
    );
    const title = circle ? "Modifier le cercle" : "Créer un cercle";
    openModal(component, title);
  }

  render() {
    const {
      circles
    } = this.props;

    return (
      <div className="sub-container">

        <Breadcrumb title="Cercles" hasBack>
          <TouchEvent
            class="right-button touch-event"
            onClick={this.openCircleModal}
          >
            <i className="icon icon-rotate-45 icon-cross" />
          </TouchEvent>
        </Breadcrumb>
        <div className="list-sub-menu small">
          <i className="big-icon icon icon-bubble" />
          <h5>Cercle(s) </h5>
        </div>
        <div>
          <List
            data={circles}
            type="circle"
            editCircle={this.openCircleModal}
            emptyListString="Aucun cercle créé."
          >
            <CircleItem />
          </List>
        </div>
      </div>
    );
  }
}
