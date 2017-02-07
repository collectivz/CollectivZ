import { MongoInternals } from 'meteor/mongo';

if (process.env.NODE_ENV !== 'FUNC_TEST') {
  console.log( 'resetDatabase is not allowed outside of a development mode.');
}
else {
   const db = MongoInternals.defaultRemoteCollectionDriver().mongo.db;

   db.runCommand({dropDatabase: 1});
   db.runCommand({dropAllUsersFromDatabase: 1});
}