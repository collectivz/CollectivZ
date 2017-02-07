import { MongoInt } from 'meteor/mongo';

if (process.env.TEST_ENV !== 'FUNCTIONAL') {
  console.log( 'resetDatabase is not allowed outside of a test mode.');
}
else {
   MongoInt.defaultRemoteCollectionDriver().mongo.db.dropDatabase();
}