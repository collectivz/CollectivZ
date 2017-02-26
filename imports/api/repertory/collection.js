import { Meteor } from "meteor/meteor";
import { Mongo } from "meteor/mongo";

class RepertoryCollection extends Mongo.Collection {
  insert(repertory, callback) {
    repertory.contacts = [];
    repertory.circles = [];
    repertory.invitationReceived = [];
    repertory.invitationSent = [];
    repertory.blackList = [];

    return super.insert(repertory);
  }
}

export const Repertory = new RepertoryCollection("repertory");

if (Meteor.isClient) {
  window.Repertory = Repertory;
}
