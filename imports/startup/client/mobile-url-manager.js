import { Meteor } from 'meteor/meteor';
import $ from 'jquery';

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
