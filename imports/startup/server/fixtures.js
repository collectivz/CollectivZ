import { Guilds, Chans, Msgs } from '../../api/collections';

Meteor.startup(function() {
  if (Guilds.find().count() === 0) {
    console.log('no guilds');
  }
})
