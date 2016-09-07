import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

class TeamCollection extends Mongo.Collection {
  insert(team, callback) {
    const userId = Meteor.userId();

    team.author = userId;
    team.members.push(userId);
    team.createdAt = Date.now();
    team.lastActivity = Date.now();
    team.name = "";

    console.log("log team juste avant le super insert");
    console.log(team);
    return super.insert(team);
  }
}

export const Teams = new TeamCollection('teams');

if (Meteor.isClient) {
  window.Teams = Teams;
}
