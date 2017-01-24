import { Meteor } from 'meteor';
import { $ } from 'meteor/underscore';

Meteor.startup(() => {
  $(document).on('deviceready', () => {
    $(document).on('click', (e) => {
      if (Meteor.isCordova) {
        const atts = e.currentTarget.attributes;
        const isUrl = /^https?:|^unix:/;
        if (typeof atts.target !== 'undefined' || isUrl.test(atts.href.value)) {
          e.preventDefault();
          e.stopImmediatePropagation();
          e.stopPropagation();
          window.open(atts.href.value, atts.target.value);
        }
      }
    });
  });
});
