import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';

import './Loader.css';

export default class Loader extends Component {
  render() {
    return (
      <div className="loading-wrapp">
        <div className="centered">
        <div className="header"></div>
            <div id="loader"></div>
            <p>Mise en marche du disrupteur dimensionnel</p>
        </div>
      </div>
    );
  }
}
