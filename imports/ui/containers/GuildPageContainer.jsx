import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { Channels } from '../../api/channels/collection.js';
import { Guilds } from '../../api/guilds/collection.js';
import { Messages } from '../../api/messages/collection.js';
import MsgItem from '../modules/msgItem/MsgItem.jsx';

import GuildPage from '../pages/GuildPage.jsx';


export default createContainer(({ params }) => {
  Meteor.subscribe('guildPage', params.guildId);
  const id = params.guildId;
  let guild = Guilds.findOne(id);
  if (!guild) {
    guild = {
      name: 'no guild',
      _id: 'no guild',
    };
  }
  return {
    guild: guild
  };
}, GuildPage);
