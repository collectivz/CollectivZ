const OneSignal = window.plugins.OneSignal;

// Add to index.js or the first page that loads with your app.
// For Intel XDK and please add this to your app.js.

OneSignal.setLogLevel(OneSignal.LOG_LEVEL.DEBUG, OneSignal.LOG_LEVEL.DEBUG);

document.addEventListener('deviceready', function () {
   // Enable to debug issues.
   OneSignal.setLogLevel({logLevel: 4, visualLevel: 4});

   var notificationOpenedCallback = function(jsonData) {
      console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
   };

   OneSignal
      .startInit("AIzaSyDf9leiVyhmfyqancbOGR0X7mno5zKWAnc")
      .handleNotificationOpened(notificationOpenedCallback)
      .endInit();

   window.plugins.OneSignal.getIds(function(ids) {
      console.log('getIds: ' + JSON.stringify(ids));
      alert("userId = " + ids.userId + ", pushToken = " + ids.pushToken);
   });

}, false);
