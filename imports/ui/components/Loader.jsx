import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';

import {Gooey}             from './Gooey.jsx';

export default class Loader extends Component {
  render() {
    return (
      <div className="preloader screen-box center">
        <div>
          <div className="circle-2"></div>
          <div className="circle-3"></div>
          <div className="circle-4"></div>
          <div className="circle-5"></div>
          <div className="circle-6"></div>
          <div className="circle-7"></div>
          <div className="circle-8"></div>
        </div>
        {Gooey()}
      </div>
    );
  }
}
