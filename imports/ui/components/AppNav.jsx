import React, { Component }                     from 'react';
import { Router, Route, Link, browserHistory }  from 'react-router';
import TouchEvent                               from './TouchEvent';
import classNames                               from 'classnames';

export default class AppNav extends Component {

  constructor( props ) {
      super( props );
      this.state = {activeUrl: null};
      this.onClick = this.onClick.bind(this);
  }

  onClick(dest) {

    setTimeout( () => {
      if (dest) {
        browserHistory.push(dest);
      }
    }, 350 );

  }

  render() {

    let activeUrl = null;

    browserHistory.listen(function(event) {
        activeUrl = event.pathname;
    });

    const { user } = this.props;

    return (
      <div className="navbar">
        <TouchEvent
            onClick={ ()=>{this.onClick("/my-groups")} }
            class={ classNames( "navbar-item touch-event", { active: activeUrl == "/my-groups" } ) }>
            <i className="icon icon-3x icon-text-bubble"/>
            <span>Récent</span>
        </TouchEvent>
        <TouchEvent
            onClick={ ()=>{this.onClick("/contact/view")} }
            class={ classNames( "navbar-item touch-event", { active: activeUrl == "/contact/view" } ) }>
            <i className="icon icon-3x icon-big-user"/>
            <span>Contacts</span>
        </TouchEvent>
        <TouchEvent
            onClick={ ()=>{this.onClick("/group-list")} }
            class={ classNames( "navbar-item touch-event", { active: activeUrl == "/group-list" } ) }>
            <i className="icon icon-3x icon-temple"/>
            <span>Groupes</span>
        </TouchEvent>
        {user.isAdmin ?
          <TouchEvent
              onClick={ ()=>{this.onClick("/admin")} }
              class={ classNames( "navbar-item touch-event", { active: activeUrl == "/admin" } ) }>
              <i className="icon icon-3x icon-star"/>
              <span>Admin</span>
          </TouchEvent>
        : '' }
        <TouchEvent
            onClick={ ()=>{this.onClick("/profile")} }
            class={ classNames( "navbar-item touch-event", { active: activeUrl == "/profile" } ) }>
            <i className="icon icon-3x icon-big-user"/>
            <span>Profil</span>
        </TouchEvent>
      </div>
    );
  }

}
