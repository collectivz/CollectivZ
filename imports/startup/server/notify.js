import { Meteor } from 'meteor/meteor';
import OneSignalClient from 'node-onesignal';

export function publish (data, options) {
    const client = new OneSignalClient('88cf61ed-a0b2-4303-98c6-114bb0991ddb', 'AIzaSyDf9leiVyhmfyqancbOGR0X7mno5zKWAnc');

    client.sendNotification(data, options);
}

export function publishCordova (data, options) {
   const client = new OneSignalClient('88cf61ed-a0b2-4303-98c6-114bb0991ddb', 'AIzaSyDf9leiVyhmfyqancbOGR0X7mno5zKWAnc');

   client.sendNotification(data, options);
}

Meteor.methods({
    'channelNotification': function (channel, text) {
       if (Meteor.isCordova)
           publishCordova( text, {included_segments: 'all'});
       else
          publish( text, {included_segments: 'all'});
    },
    'userNotification': function (text, userId) {
       if (Meteor.isCordova)
          publishCordova( text, {include_player_ids: userId});
       else
          publish( text, {included_segments: 'all'});
    }
});
