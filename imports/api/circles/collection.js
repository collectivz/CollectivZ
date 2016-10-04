import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

class CircleCollection extends Mongo.Collection {
  insert(circle, callback) {
    const userId = Meteor.userId();

    circle.author = userId;
    circle.createdAt = Date.now();
    circle.lastActivity = Date.now();
    circle.picture = '/img/no-user.png';
    circle.channel = '';

    return super.insert(circle);
  }
}

export const Circles = new CircleCollection('circles');

if (Meteor.isClient) {
  window.Circles = Circles;
}
