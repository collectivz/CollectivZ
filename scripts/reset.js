import { Meteor } from 'meteor/meteor';
import { MongoInt } from 'meteor/mongo';
import { _ } from 'meteor/underscore';

if (process.env.TEST_ENV !== 'FUNCTIONAL') {
  console.log('resetDatabase is not allowed outside of a test mode.');
  return;
}

const excludedCollections = ['system.indexes'];
const db = MongoInt.defaultRemoteCollectionDriver().mongo.db;
const getCollections = Meteor.wrapAsync(db.collections, db);
const collections = getCollections();
const appCollections = _.reject(collections, col => col.collectionName.indexOf('velocity') === 0 ||
      excludedCollections.indexOf(col.collectionName) !== -1);

_.each(appCollections, (appCollection) => {
  const remove = Meteor.wrapAsync(appCollection.remove, appCollection);
  remove({});
});
