Meteor.startup(() => {

   // nope
   FCMPlugin.onTokenRefresh(function(token){
      alert( token );
   });

   FCMPlugin.getToken(function(token){
      alert(token);
   });

   FCMPlugin.onNotification(function(data){
      if(data.wasTapped){
         //Notification was received on device tray and tapped by the user.
         alert( JSON.stringify(data) );
      }else{
         //Notification was received in foreground. Maybe the user needs to be notified.
         alert( JSON.stringify(data) );
      }
   });
});
