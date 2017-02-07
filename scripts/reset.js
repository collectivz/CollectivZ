import { MongoInt } from 'meteor/mongo';

if (process.env.NODE_ENV !== 'FUNC_TEST') {
  console.log( 'resetDatabase is not allowed outside of a test mode.');
}
else {
   MongoInt.defaultRemoteCollectionDriver().mongo.db.dropDatabase();
}