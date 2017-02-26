import React, { Component, PropTypes } from "react";
import { Meteor } from "meteor/meteor";
import TouchEvent from "./TouchEvent";
import { Router, Route, Link, browserHistory } from "react-router";
import classNames from "classnames";
import { _ } from "meteor/underscore";

import { Toast } from "../helpers/Toast";
import { openModal } from "../helpers/Modal";

export default class CircleItem extends React.Component {
  constructor(props) {
    super(props);

    this.removeCircle = this.removeCircle.bind(this);
    this.createConversation = this.createConversation.bind(this);
    this.toggleConversationButton = this.toggleConversationButton.bind(this);
  }

  onClick(dest) {
    setTimeout(
      () => {
        if (dest) {
          browserHistory.push(dest);
        }
      },
      350
    );
  }

  createConversation(e) {
    e.preventDefault();
    const {
      data
    } = this.props;

    Meteor.call("channels.conversationCreate", data.members, data._id, (
      err,
      res
    ) => {
      if (err) {
        Toast(err.reason, "danger");
      } else {
        Toast("Conversation créée", "success");
        this.context.router.push(`/conversation/${res}`);
      }
    });
  }

  removeCircle(e) {
    e.preventDefault();
    const {
      data
    } = this.props;

    Meteor.call("circles.remove", data._id, (err, res) => {
      if (err) {
        Toast(err.reason, "danger");
      } else {
        Toast("Le cercle a bien été supprimé.", "success");
      }
    });
  }

  toggleConversationButton() {
    const {
      data
    } = this.props;
    const {
      router
    } = this.context;

    if (data.channel) {
      return <button
          className="button success"
          onClick={() => {
            router.push(`/conversation/${data.channel}`);
          }}
        ><i className="icon icon-eye" /></button>;
    }
    return (
      <button className="button success" onClick={this.createConversation}>
        <i className="icon icon-plus-circle" />
      </button>
    );
  }

  render() {
    const {
      data,
      editCircle
    } = this.props;

    console.log(data);

    return (
      <TouchEvent class="list-item no-image touch-event">
        <div className="list-item-content">
          <p className="title">{data.name}</p>
          {data.members.length
            ? <div className="tag">
                <i className="icon icon-user" />
                <span>{data.members.length}</span>
              </div>
            : <div className="tag">
                <span>Vous êtes tout seul.</span>
              </div>}
        </div>
        <div className="list-item-action">
          <div className="merge">
            <button className="button danger" onClick={this.removeCircle}>
              <i className="icon icon-cross" />
            </button>
            <button
              className="button info"
              onClick={editCircle.bind(this, data)}
            >
              <i className="icon icon-pencil" />
            </button>
            {this.toggleConversationButton()}
          </div>
        </div>
      </TouchEvent>
    );
  }
}

CircleItem.contextTypes = {
  router: PropTypes.object
};

// CircleItem.propTypes = {
//   data: PropTypes.object.isRequired,
// };
