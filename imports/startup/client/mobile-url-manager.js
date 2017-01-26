import { Meteor } from 'meteor/meteor';
import $ from 'jquery';

Meteor.startup(() => {
  $(document).on('deviceready', () => {
    $(document).on('click', (e) => {
//      if (Meteor.isCordova) {
      const atts = e.currentTarget.attributes;
      if (typeof atts.target !== 'undefined') {
        e.preventDefault();
        e.stopImmediatePropagation();
        e.stopPropagation();
        window.open(atts.href.value, atts.target.value);
      }
//      }
    });
  });
});
