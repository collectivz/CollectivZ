import { Meteor } from 'meteor/meteor';
import { Push } from 'meteor/raix:push';

Push.debug = true;

Push.Configure({
   apn: {
//      certData: Assets.getText('apnDevCert.pem'),
//      keyData: Assets.getText('apnDevKey.pem'),
      passphrase: 'xxxxxxxxx',
      production: true,
      //gateway: 'gateway.push.apple.com',
   },
   gcm: {
      apiKey: 'AAAAUqW_zOo:APA91bG6Vu_eGxPv5xwg5abwp29y4pvWrABNjnI1LHZfdrO8IRLi8Y72uuHnbnwfDr-iUKuCL1QyHImToIRZlaOMEiBEDvbACMkPHOXlbPfo0q18owgRB9sJn32mEATuwxACJoLwn_ji',
      projectNumber: 354968128746,
   },
   // production: true,
   // 'sound' true,
   // 'badge' true,
   // 'alert' true,
   // 'vibrate' true,
   // 'sendInterval': 15000, Configurable interval between sending
   // 'sendBatchSize': 1, Configurable number of notifications to send per batch
   // 'keepNotifications': false,
//
});

Push.allow({
   send(userId, notification) {
      return true; // Allow all users to send
   },
});

// Or...
Push.deny({
   send(userId, notification) {
      return false; // Allow all users to send
   }
});

Meteor.methods({
   serverNotification(text, title) {
      Push.send({
         from: 'CollectivZ Global Notification',
         title,
         text,
         badge: 12,
         query: {},
      });
   },
   userNotification(text, title, userId) {
      Push.send({
         from: 'CollectivZ User Notification',
         title,
         text,
         badge: 12,
         query: { userId },
      });
   },
   tokenNotification(title, text, token) {
      Push.send({
         from: 'CollectivZ Token Notification',
         title,
         text,
         badge: 12,
         token,
      });
   },
});

