document.addEventListener(
  "deviceready",
  () => {
    // Enable to debug issues.
    // window.plugins.OneSignal.setLogLevel({logLevel: 4, visualLevel: 4});

    const notificationOpenedCallback = function(jsonData) {
      console.log(`notificationOpenedCallback: ${JSON.stringify(jsonData)}`);
    };

     const notificationGetIds = function(mobileId) {
        window.mobileId = mobileId;
        console.log(`mobileId is: ${JSON.stringify(mobileId)}`);
     };

    if (Meteor.isCordova) {
      window.plugins.OneSignal
        .startInit("88cf61ed-a0b2-4303-98c6-114bb0991ddb")
        .handleNotificationOpened(notificationOpenedCallback)
        .getIds( notificationGetIds);
       window.plugins.OneSignal.endInit();
    }

    // Call syncHashedEmail anywhere in your app if you have the user's email.
    // This improves the effectiveness of OneSignal's "best-time" notification scheduling feature.
    // window.plugins.OneSignal.syncHashedEmail(userEmail);
  },
  false
);
