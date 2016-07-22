import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const Chans = new Mongo.Collection('chans');
export const Msgs = new Mongo.Collection('msgs');
