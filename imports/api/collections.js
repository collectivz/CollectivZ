import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const Guilds = new Mongo.Collection('guilds');
export const Chans = new Mongo.Collection('chans');
export const Msgs = new Mongo.Collection('msgs');
export const Polls = new Mongo.Collection('polls');
