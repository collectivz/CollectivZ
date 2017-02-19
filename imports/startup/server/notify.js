import { Meteor } from 'meteor/meteor';

Meteor.methods({
  serverNotification(channel, text) {
    const notificationObj = { contents: { en: text }, included_segments: 'all' };

    window.plugins.OneSignal.postNotification(notificationObj,
         (successResponse) => {
           console.log('Notification Post Success:', successResponse);
         },
         (failedResponse) => {
           console.log('Notification Post Failed: ', failedResponse);
           alert(`Notification Post Failed:\n${JSON.stringify(failedResponse)}`);
         },
      );
  },
  userNotification(text, userId) {
    const notificationObj = { contents: { en: text }, include_player_ids: userId };

    window.plugins.OneSignal.postNotification(notificationObj,
         (successResponse) => {
           console.log('Notification Post Success:', successResponse);
         },
         (failedResponse) => {
           console.log('Notification Post Failed: ', failedResponse);
           alert(`Notification Post Failed:\n${JSON.stringify(failedResponse)}`);
         },
      );
  },
});

