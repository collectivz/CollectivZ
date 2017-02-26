import React, { Component } from "react";
import { browserHistory } from "react-router";
import classNames from "classnames";
import TouchEvent from "./TouchEvent";

export default class AppNav extends Component {
  constructor(props) {
    super(props);
    this.state = { activeUrl: null };
    this.onClick = this.onClick.bind(this);
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

  render() {
    let activeUrl = null;

    browserHistory.listen(event => {
      activeUrl = event.pathname;
    });

    const { user } = this.props;

    return (
      <div className="navbar">
        <TouchEvent
          onClick={() => {
            this.onClick("/my-groups");
          }}
          class={classNames("navbar-item touch-event", {
            active: activeUrl == "/my-groups"
          })}
        >
          <i className="icon icon-3x icon-text-bubble" />
          <span>Récent</span>
        </TouchEvent>
        <TouchEvent
          onClick={() => {
            this.onClick("/contact");
          }}
          class={classNames("navbar-item touch-event", {
            active: activeUrl == "/contact"
          })}
        >
          <i className="icon icon-3x icon-book" />
          <span>Contacts</span>
        </TouchEvent>
        <TouchEvent
          onClick={() => {
            this.onClick("/group-list");
          }}
          class={classNames("navbar-item touch-event", {
            active: activeUrl == "/group-list"
          })}
        >
          <i className="icon icon-3x icon-users" />
          <span>Groupes</span>
        </TouchEvent>
        {user.isAdmin
          ? <TouchEvent
              onClick={() => {
                this.onClick("/admin");
              }}
              class={classNames("navbar-item touch-event", {
                active: activeUrl == "/admin"
              })}
            >
              <i className="icon icon-3x icon-cog" />
              <span>Admin</span>
            </TouchEvent>
          : ""}
        <TouchEvent
          onClick={() => {
            this.onClick("/my-profile");
          }}
          class={classNames("navbar-item touch-event", {
            active: activeUrl == "/my-profile"
          })}
        >
          <i className="icon icon-3x icon-big-user" />
          <span>Profil</span>
        </TouchEvent>
      </div>
    );
  }
}
