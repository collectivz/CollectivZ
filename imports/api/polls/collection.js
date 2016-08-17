import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const Polls = new Mongo.Collection('polls');
export const Propositions = new Mongo.Collection('propositions');

if (Meteor.isClient) {
  window.Polls = Polls;
  window.Propositions = Propositions;
}
