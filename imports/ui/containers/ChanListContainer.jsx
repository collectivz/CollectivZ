import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Chans } from '../../api/collections.js';

import ChanList from '../pages/ChanList.jsx';

export default createContainer(() => {
  // Meteor.subscribe('users');
  return {
    channels: Chans.find({}).fetch(),
  };
}, ChanList);
