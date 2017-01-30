Meteor.startup(function() {
   if (!Meteor.isCordova) {
      return;
   }
   return $(document).on('deviceready', function() {
      return $(document).on('click', function(e) {
         var $link, url;
         $link = $(e.target).closest('a[href]');
         if (!($link.length > 0)) {
            return;
         }
         url = $link.attr('href');
         if (/^https?:\/\/.+/.test(url) === true) {
            window.open(url, '_system');
            return e.preventDefault();
         }
      });
   });
});