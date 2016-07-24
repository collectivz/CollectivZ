import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Chans, Msgs } from '../../api/collections.js';
import MsgItem from '../modules/msgItem/MsgItem.jsx';

import ChatPage from '../pages/ChatPage.jsx';


export default createContainer(({ params }) => {
  // Meteor.subscribe('users');
  const id = params.chatId;
  let chanArr = Chans.find({_id: id}).fetch();
  let chan = '...';
  if (chanArr.length) {
    chan = chanArr[0].test;
  }
  console.log(chanArr[0]);

  return {
    msgs: Msgs.find({chanId: id}).fetch(),
    chan: chan,
  };
}, ChatPage);
