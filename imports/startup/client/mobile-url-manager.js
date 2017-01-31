Meteor.startup(() => {
  if (!Meteor.isCordova) {
    return;
  }
  return $(document).on('deviceready', () =>
     $(document).on('click', (e) => {
       const $link = $(e.target).closest('a[href]');
       if (!($link.length > 0)) {
         return;
       }
       const url = $link.attr('href');
       if (/^https?:\/\/.+/.test(url) === true) {
         cordova.InAppBrowser.open(url, '_system');
         return e.preventDefault();
       }
     }));
});
