import React, { Component } from 'react';

import './TopNav.css';

export default class TopNav extends Component {

  render() {
    return (
      <div className="view-container">
        <div className="top-nav">
          <div className="title">
            <h2>{this.props.text}</h2>
          </div>
        </div>
      </div>
    );
  }

}
