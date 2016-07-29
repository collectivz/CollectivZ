import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { Guilds } from '../../api/guilds/collection.js';

import GuildList from '../pages/GuildList.jsx';

export default createContainer(() => {
  Meteor.subscribe('guildList');
  return {
    guildes: Guilds.find({}).fetch(),
  };
}, GuildList);
