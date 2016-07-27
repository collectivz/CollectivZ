import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Chans, Msgs, Guilds } from '../../api/collections.js';
import MsgItem from '../modules/msgItem/MsgItem.jsx';

import GuildPage from '../pages/GuildPage.jsx';


export default createContainer(({ params }) => {
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
