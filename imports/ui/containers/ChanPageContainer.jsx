import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Chans, Msgs } from '../../api/collections.js';
import MsgItem from '../modules/msgItem/MsgItem.jsx';

import ChanPage from '../pages/ChanPage.jsx';


export default createContainer(({ params }) => {
  // Meteor.subscribe('users');
  const id = params.chatId;
  let chan = Chans.findOne(id);
  if (!chan) {
    chan = {
      title: 'no found',
      _id: 'not found',
    };
  }

  return {
    msgs: Msgs.find({chanId: id}).fetch(),
    chanName: chan.title,
    chanId: chan._id
  };
}, ChanPage);
