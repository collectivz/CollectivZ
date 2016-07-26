import React, { Component } from 'react';
import { Link } from 'react-router';

import './AppNav.css';

export default class AppNav extends Component {

  isAdmin() {

  }

  render() {
    return (
      <div className="view-container">
        <div className="tabs-nav">
          <Link activeClassName="active" className="tab-item" to="/chans">
            <i className="fa fa-commenting" aria-hidden="true"></i>
            <span className="tab-title">Chans</span>
          </Link>
          <Link activeClassName="active" className="tab-item" to="/guildes">
            <i className="fa fa-university" aria-hidden="true"></i>
            <span className="tab-title">Guildes</span>
          </Link>
          {this.props.user.profile.admin ?
          <Link activeClassName="active" className="tab-item" to="/admin">
            <i className="fa fa-wrench" aria-hidden="true"></i>
            <span className="tab-title">Admin</span>
          </Link> : '' }
          <Link activeClassName="active" className="tab-item" to="/profil">
            <i className="fa fa-info-circle" aria-hidden="true"></i>
            <span className="tab-title">Profile</span>
          </Link>
        </div>
      </div>
    );
  }

}
