import { Meteor } from "meteor/meteor";
import { Accounts } from "meteor/accounts-base";

import { Channels } from "../channels/collection";

Meteor.methods({
  "admin.addMoney": function(amount) {
    if (!this.userId) {
      throw new Meteor.Error(
        "not-logged",
        "Vous devez être connecté pour répartir de l'argent."
      );
    }

    if (!Meteor.user().isAdmin) {
      throw new Meteor.Error(
        "no-right",
        "Vous n'avez pas les droits pour répartir de l'argent"
      );
    }

    check(
      amount,
      Match.Where(amount => {
        check(amount, Number);
        if (amount > 0) {
          return true;
        }
        return false;
      })
    );

    Meteor.users.update({ username: { $ne: "Zorro" } }, {
      $inc: { coinz: amount }
    });
  },

  "admin.addAdmin": function(username) {
    if (!this.userId) {
      throw new Meteor.Error(
        "not-logged",
        "Vous devez être connecté pour ajouter un coordinateur."
      );
    }

    if (!Meteor.user().isAdmin) {
      throw new Meteor.Error(
        "no-right",
        "Vous n'avez pas les droits pour ajouter un coordinateur."
      );
    }

    check(username, String);

    const user = Accounts.findUserByUsername(username);

    if (!user) {
      throw new Meteor.Error(
        "user-not-found",
        "Aucun utilisateur ne correspond à ce nom."
      );
    }

    Meteor.users.update(user._id, {
      $set: { isAdmin: true }
    });
  },

  "admin.removeAdmin": function(userId) {
    if (!this.userId) {
      throw new Meteor.Error(
        "not-logged",
        "Vous devez être connecté pour enlever un coordinateur."
      );
    }

    if (!Meteor.user().isAdmin) {
      throw new Meteor.Error(
        "no-right",
        "Vous n'avez pas les droits pour enlever un coordinateur"
      );
    }

    check(userId, String);

    if (userId === this.userId) {
      throw new Meteor.Error(
        "use-your-brain",
        "Mieux vaut ne pas vous retirer les droits d'administration."
      );
    }

    Meteor.users.update(userId, {
      $set: { isAdmin: false }
    });
  },

  "admin.exportData": function() {
    if (!this.userId) {
      throw new Meteor.Error("not-logged", "Vous devez être connecté");
    }

    if (!Meteor.user().isAdmin) {
      throw new Meteor.Error("no-right", "Vous n'avez pas les droits");
    }
    const result = [];
    const groups = Channels.find({ type: "group" }).fetch();
    groups.forEach(group => {
      const author = Meteor.users.findOne(group.author);
      result.push({
        Groupe: group.name,
        Créateur: author.username,
        Email: author.emails[0].address
      });
    });

    return result;
  }
});
