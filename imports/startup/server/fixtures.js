import '../../api/users/users.js';
import { Meteor } from 'meteor/meteor';


Meteor.startup(() => {
  if (process.env.TEST_ENV === 'FUNCTIONAL') {
    if (Meteor.users) Meteor.users.remove({});
    if (Meteor.polls) Meteor.polls.remove({});
    if (Meteor.emails) Meteor.emails.remove({});
    if (Meteor.history) Meteor.history.remove({});
    if (Meteor.messages) Meteor.messages.remove({});
    if (Meteor.propositions) Meteor.propositions.remove({});
    if (Meteor.repertory) Meteor.repertory.remove({});
    if (Meteor.channels) Meteor.channels.remove({});
    if (Meteor.beers) Meteor.beers.remove({});
    if (Meteor.archives) Meteor.archives.remove({});
    if (Meteor.coins) Meteor.coins.remove({});
    if (Meteor.circles) Meteor.circles.remove({});
    if (Meteor.buddies) Meteor.buddies.remove({});
    if (Meteor.feedback) Meteor.feedback.remove({});
    if (Meteor.heroes) Meteor.heroes.remove({});
  } else if (process.env.TEST_ENV === 'STAGING') {
    if (Meteor.users.find().count() === 0) {
      Accounts.createUser({
        email: 'mastermind@mastermind.com',
        username: 'mastermind',
        password: 'mastermind',
        profile: {
          firstName: 'tammy',
          lastName: 'mind',
        },
      });
      Accounts.createUser({
        email: 'pdecrat@student.42.fr',
        username: 'philippe',
        password: 'collectivz',
        profile: {
          firstName: 'philippe',
          lastName: 'decrat',
        },
      });
      Accounts.createUser({
        email: 'tfrere@student.42.fr',
        username: 'thibaud',
        password: 'collectivz',
        profile: {
          firstName: 'thibaud',
          lastName: 'frere',
        },
      });
      Accounts.createUser({
        email: 'boris@collectivz.info',
        username: 'boris',
        password: 'collectivz',
        profile: {
          firstName: 'boris',
          lastName: 'sirbey',
        },
      });

      Accounts.createUser({
        email: 'mpdequier@gmail.com',
        username: 'marie-pierre',
        password: 'collectivz',
        profile: {
          firstName: 'marie-pierre',
          lastName: 'dequier',
        },
      });
      Accounts.createUser({
        email: 'plop@zorro.com',
        username: 'mathias',
        password: 'collectivz',
        profile: {
          firstName: 'zorro',
          lastName: 'de la Vega',
        },
      });
      Accounts.createUser({
        email: 'ploup@zorro.com',
        username: 'nathan',
        password: 'collectivz',
        profile: {
          firstName: 'zorro',
          lastName: 'de la Vega',
        },
      });
      Accounts.createUser({
        email: 'chop@zorro.com',
        username: 'no-yon',
        password: 'collectivz',
        profile: {
          firstName: 'zorro',
          lastName: 'de la Vega',
        },
      });
    }
  }
  if (Meteor.users.find().count() === 0) {
    Accounts.createUser({
      email: 'zorro@zorro.com',
      username: 'Zorro',
      password: 'zorro',
      profile: {
        avatar: '/img/zorro.jpg',
        firstName: 'zorro',
        lastName: 'de la Vega',
      },
    });
  }
});
