Template.Layout.events({
  'click a.system-browser': (evt) => {
    evt.preventDefault();
    const href = $(evt.target).closest('a').attr('href');
    window.open(href, '_blank', 'location=yes');
  },
});
