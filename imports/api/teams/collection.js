import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

class TeamCollection extends Mongo.Collection {
  insert(team, callback) {
    const userId = Meteor.userId();

    team.author = userId;
    team.createdAt = Date.now();
    team.lastActivity = Date.now();
    team.name = "";
    team.background = '/img/ugly.png';
    team.picture = '/img/no-user.png';
    team.channel = '';

    return super.insert(team);
  }
}

export const Teams = new TeamCollection('teams');

if (Meteor.isClient) {
  window.Teams = Teams;
}
