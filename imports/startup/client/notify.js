Meteor.startup(() => {
   document.addEventListener('deviceready', function () {
      // Enable to debug issues.
      // window.plugins.OneSignal.setLogLevel({logLevel: 4, visualLevel: 4});

      var notificationOpenedCallback = function(jsonData) {
         console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
      };

      window.plugins.OneSignal
         .startInit("354968128746")
         .handleNotificationOpened(notificationOpenedCallback)
         .endInit();

      // Call syncHashedEmail anywhere in your app if you have the user's email.
      // This improves the effectiveness of OneSignal's "best-time" notification scheduling feature.
      // window.plugins.OneSignal.syncHashedEmail(userEmail);
   }, false);
});