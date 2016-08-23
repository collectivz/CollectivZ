import React, { Component } from 'react';
import { Link } from 'react-router';

import './AppNav.css';

export default class AppNav extends Component {

  render() {
    const {
      user
    } = this.props;
    return (
      <div className="tabs-nav">
        <Link activeClassName="active" className="tab-item" to="/my-groups">
          <i className="fa fa-commenting" aria-hidden="true"></i>
          <span className="tab-title">Mes groupes</span>
        </Link>
        <Link activeClassName="active" className="tab-item" to="/group-list">
          <i className="fa fa-university" aria-hidden="true"></i>
          <span className="tab-title">Tout les groupes</span>
        </Link>
        {user.profile.admin ?
        <Link activeClassName="active" className="tab-item" to="/admin">
          <i className="fa fa-wrench" aria-hidden="true"></i>
          <span className="tab-title">Admin</span>
        </Link> : '' }
        <Link activeClassName="active" className="tab-item" to="/profile">
          <i className="fa fa-info-circle" aria-hidden="true"></i>
          <span className="tab-title">Mon profil</span>
        </Link>
      </div>
    );
  }

}
