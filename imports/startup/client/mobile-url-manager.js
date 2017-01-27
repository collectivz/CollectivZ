import { Meteor } from 'meteor';
import { $ } from 'meteor/underscore';

Meteor.startup(() => {
   if (Meteor.isCordova) {
      $(document).on('deviceready', () => {
         window.open = cordova.InAppBrowser.open;
      });
   }
});