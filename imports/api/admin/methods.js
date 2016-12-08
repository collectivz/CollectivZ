import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

import { Channels } from '../channels/collection';

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

    if (userId === this.userId) {
      throw new Meteor.Error('use-your-brain',
        "Mieux vaut ne pas vous retirer les droits d'administration.");
    }

    Meteor.users.update(userId, {
      $set: { isAdmin: false }
    });
  },

  'admin.exportData'() {
    if (!this.userId) {
      throw new Meteor.Error('not-logged',
        "Vous devez être connecté");
    }

    if (!Meteor.user().isAdmin) {
      throw new Meteor.Error('no-right',
        "Vous n'avez pas les droits");
    }

    const users = Meteor.users.find().fetch();
    let result = [];

    users.forEach(user => {
      const group = Channels.findOne({ author: user._id });
      if (group) {
        result.push({
          username: user.username,
          email: user.emails[0].address,
          phone: user.phone,
          groupName: group.name,
          groupDescription: group.description,
          groupMemberCount: group.members.length
        });
      } else {
        result.push({
          username: user.username,
          email: user.emails[0].address,
          phone: user.phone,
        });
      }
    });

    return result;
  }
});
