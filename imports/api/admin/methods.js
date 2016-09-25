import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

Meteor.methods({
  'admin.addMoney'(amount) {
    if (!this.userId) {
      throw new Meteor.Error('not-logged',
        "Vous devez être connecté pour répartir de l'argent.");
    }

    if (!Meteor.user().isAdmin) {
      throw new Meteor.Error('no-right',
        "Vous n'avez pas les droits pour répartir de l'argent");
    }


    check(amount, Match.Where(amount => {
      check(amount, Number);
      if (amount > 0) {
        return true;
      }
      return false;
    }));

    Meteor.users.update({ username: { $ne: 'Zorro' } },
      { $inc: { coinz: amount } });
  },

  'admin.addAdmin'(username) {
    if (!this.userId) {
      throw new Meteor.Error('not-logged',
        "Vous devez être connecté pour ajouter un coordinateur.");
    }

    if (!Meteor.user().isAdmin) {
      throw new Meteor.Error('no-right',
        "Vous n'avez pas les droits pour ajouter un coordinateur.");
    }

    check(username, String);

    const user = Accounts.findUserByUsername(username);

    if (!user) {
      throw new Meteor.Error('user-not-found',
        "Aucun utilisateur ne correspond à ce nom.");
    }

    Meteor.users.update(user._id, {
      $set: { isAdmin: true }
    });
  },

  'admin.removeAdmin'(userId) {
    if (!this.userId) {
      throw new Meteor.Error('not-logged',
        "Vous devez être connecté pour enlever un coordinateur.");
    }

    if (!Meteor.user().isAdmin) {
      throw new Meteor.Error('no-right',
        "Vous n'avez pas les droits pour enlever un coordinateur");
    }

    check(userId, String);

    Meteor.users.update(userId, {
      $set: { isAdmin: false }
    });
  }
});
