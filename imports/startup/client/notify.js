
document.addEventListener('deviceready', () => {
   // Enable to debug issues.
   // window.plugins.OneSignal.setLogLevel({logLevel: 4, visualLevel: 4});

  const notificationOpenedCallback = function (jsonData) {
    console.log(`notificationOpenedCallback: ${JSON.stringify(jsonData)}`);
  };

  const notificationIdsCallback = function (ids) {
    console.log(`getIds: ${JSON.stringify(ids)}`);
  };

  if (Meteor.isCordova) {
    window.plugins.OneSignal
         .startInit('354968128746')
         .handleNotificationOpened(notificationOpenedCallback)
         .getIds(notificationIdsCallback)
         .endInit();

    window.plugins.OneSignal.getIds(notificationIdsCallback);
  }

   // Call syncHashedEmail anywhere in your app if you have the user's email.
   // This improves the effectiveness of OneSignal's "best-time" notification scheduling feature.
   // window.plugins.OneSignal.syncHashedEmail(userEmail);
}, false);
