document.addEventListener(
  'deviceready',
  () => {
    // Enable to debug issues.
    //window.plugins.OneSignal.setLogLevel({ logLevel: 4, visualLevel: 4 });

    const notificationOpenedCallback = function (jsonData) {
      console.log(`notificationOpenedCallback: ${JSON.stringify(jsonData)}`);
    };

    if (Meteor.isCordova) {
      window.plugins.OneSignal
        .startInit('88cf61ed-a0b2-4303-98c6-114bb0991ddb')
        .handleNotificationOpened(notificationOpenedCallback)
        .endInit();

      setTimeout(() => {
        // c'est complètement merdique mais pas trouvé d'autre moyen
        console.log('call getIds');
        window.plugins.OneSignal.getIds((mobileId) => {
          console.log(`mobileId is: ${JSON.stringify(mobileId)}`);
          Meteor.call('registerUser', Meteor.userId(), mobileId);
        });
      }, 60);
    }

    // Call syncHashedEmail anywhere in your app if you have the user's email.
    // This improves the effectiveness of OneSignal's "best-time" notification scheduling feature.
    // window.plugins.OneSignal.syncHashedEmail(userEmail);
  },
  false,
);
