import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

class ContactCollection extends Mongo.Collection {
  insert(contact, callback) {
    const userId = Meteor.userId();


    return super.insert(contact);
  }
}

export const Contacts = new ContactCollection('contacts');

if (Meteor.isClient) {
  window.Contacts = Contacts;
}
