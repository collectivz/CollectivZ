import React, { Component } from 'react';
import { Link } from 'react-router';

import './AppNav.css';

export default class AppNav extends Component {

  render() {
    return (
      <div className="view-container">
        <div className="tabs-nav">
          <Link activeClassName="active" className="tab-item" to="/chans">
            <i className="fa fa-commenting" aria-hidden="true"></i>
            <span className="tab-title">CHANNELS</span>
          </Link>
          <Link activeClassName="active" className="tab-item" to="/contacts">
            <i className="fa fa-commenting" aria-hidden="true"></i>
            <span className="tab-title">CONTACTS</span>
          </Link>
          <Link activeClassName="active" className="tab-item" to="/guildes">
            <i className="fa fa-commenting" aria-hidden="true"></i>
            <span className="tab-title">GUILDES</span>
          </Link>
          <Link activeClassName="active" className="tab-item" to="/profil">
            <i className="fa fa-commenting" aria-hidden="true"></i>
            <span className="tab-title">PROFIL</span>
          </Link>
        </div>
        {this.props.children}
      </div>
    );
  }

}
