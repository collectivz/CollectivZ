Template.Layout.events({
   'click a.system-browser': function(evt) {
      evt.preventDefault();
      var href = $(evt.target).closest('a').attr('href');
      window.open(href, '_system', 'location=yes');
   }
});