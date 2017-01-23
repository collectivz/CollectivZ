import { Meteor } from 'meteor';
import { $ } from 'meteor/underscore';

const urlRegex = new RegExp(/[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi);

Meteor.startup(() => {
  if (Meteor.isCordova) {
    window.open = cordova.InAppBrowser.open;
    const platform = device.platform.toLowerCase();
    console.log(platform);

    $(document).on('deviceready', () => {
      $(document).on('click', e => {
        const $link = $(e.target).closest('a[href]');

        if ($link.length > 0) {
          const url = $link.attr('href');
          if (urlRegex.test(url)) {
            window.open(url, '_system');
          }
        }
      });
    });
  }
});
