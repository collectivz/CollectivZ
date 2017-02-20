document.addEventListener('deviceready', function () {
   // Enable to debug issues.
   window.plugins.OneSignal.setLogLevel({logLevel: 4, visualLevel: 4});

   var notificationOpenedCallback = function(jsonData) {
      console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
   };

   window.plugins.OneSignal
      .startInit("AIzaSyDf9leiVyhmfyqancbOGR0X7mno5zKWAnc")
      .handleNotificationOpened(notificationOpenedCallback)
      .endInit();

   window.plugins.OneSignal.getIds(function(ids) {
      console.log('getIds: ' + JSON.stringify(ids));
      alert("userId = " + ids.userId + ", pushToken = " + ids.pushToken);
   });

}, false);

Meteor.methods({
   'channelNotification': function (channel, text) {
      const notificationObj = { contents: { en: text }, included_segments: ['all'] };

      Meteor.call('publish', notificationObj);
   },
   'userNotification': function (text, userId) {
      const notificationObj = { contents: { en: text }, include_player_ids: userId };

      Meteor.call('publish', notificationObj);
   },
   'publish': function (data) {
      if (Meteor.isCordova) {
         window.plugins.OneSignal.postNotification(data,
            (successResponse) => {
               console.log('Notification Post Success:', successResponse);
            },
            (failedResponse) => {
               console.log('Notification Post Failed: ', failedResponse);
               alert(`Notification Post Failed:\n${JSON.stringify(failedResponse)}`);
            },
         );
      }
      else {
         var notificationObj = { app_id: "88cf61ed-a0b2-4303-98c6-114bb0991ddb", ...data}
         var headers = {
            "Content-Type": "application/json; charset=utf-8",
            "Authorization": "Basic NGEwMGZmMjItY2NkNy0xMWUzLTk5ZDUtMDAwYzI5NDBlNjJj"
         };

         var options = {
            host: "onesignal.com",
            port: 443,
            path: "/api/v1/notifications",
            method: "POST",
            headers: headers
         };

         var https = require('https');
         var req = https.request(options, function(res) {
            res.on('data', function(notificationObj) {
               console.log("Response:");
               console.log(JSON.parse(notificationObj));
            });
         });

         req.on('error', function(e) {
            console.log("ERROR:");
            console.log(e);
         });

         req.write(JSON.stringify(notificationObj));
         req.end();
      }
   },
});
