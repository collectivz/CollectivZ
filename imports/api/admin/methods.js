import { Meteor } from 'meteor/meteor';

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
  }
});
