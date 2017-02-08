import '../../api/users/users.js';
import { Meteor } from 'meteor/meteor';

function dbReset(collectionNames) {

   var collections = _.map(collectionNames, function(collectionName) {
      return _.reduce(collectionName.split('.'), function (memo, name) {
         return memo[name];
      }, GLOBAL);
   });

   Tracker.nonreactive( () => {
      _.each(collections, (collection) => {
         collection.find().forEach( (doc) => {
            collection.remove(doc._id);
         });
      });
   });

};


Meteor.startup(() => {
  if (process.env.TEST_ENV === 'FUNCTIONAL') {
    dbReset(['users', 'polls', 'history', 'messages', 'repertory', 'channels', 'beers', 'archives', 'coins', 'circles', 'feedback']);
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
    }
  }
  if (Meteor.users.find().count() === 0) {
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
