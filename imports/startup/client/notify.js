Meteor.startup(() => {
   Push.Configure({
      android: {
         senderID: 354968128746,
         alert: true,
         badge: true,
         sound: true,
         vibrate: true,
         clearNotifications: true,
         // icon: '',
         // iconColor: ''
      },
      ios: {
         alert: true,
         badge: true,
         sound: true,
      },
   });

   Push.enabled(true); // Will enable notifications (requires a token...)

   Push.addListener('message', function(notification) {
      // Called on every message
      console.log(JSON.stringify(notification));
   });

   // Internal events
   Push.addListener('token', function(token) {
      // Token is { apn: 'xxxx' } or { gcm: 'xxxx' }
      console.log(JSON.stringify(token));
   });
});