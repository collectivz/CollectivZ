document.addEventListener('deviceready', () => {
   // Enable to debug issues.
  window.plugins.OneSignal.setLogLevel({ logLevel: 4, visualLevel: 4 });

  const notificationOpenedCallback = function (jsonData) {
    console.log(`notificationOpenedCallback: ${JSON.stringify(jsonData)}`);
  };

  window.plugins.OneSignal
      .startInit('AIzaSyDf9leiVyhmfyqancbOGR0X7mno5zKWAnc')
      .handleNotificationOpened(notificationOpenedCallback)
      .endInit();

  window.plugins.OneSignal.getIds((ids) => {
    console.log(`getIds: ${JSON.stringify(ids)}`);
    alert(`userId = ${ids.userId}, pushToken = ${ids.pushToken}`);
  });
}, false);

