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
});