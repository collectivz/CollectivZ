import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';

export default class Loader extends Component {
  render() {
    return (
      <div className="screen-box center">
        <div id="preloader" class="center-wrapper">
        </div>
      </div>
    );
  }
}
