if (process.env.NODE_ENV !== 'FUNC_TEST') {
  console.log( 'resetDatabase is not allowed outside of a development mode.');
}

let excludedCollections = ['system.indexes'];
const db = MongoInternals.defaultRemoteCollectionDriver().mongo.db;
const getCollections = Meteor.wrapAsync(db.collections, db);
const collections = getCollections();
const appCollections = _.reject(collections, col => col.collectionName.indexOf('velocity') === 0 ||
      excludedCollections.indexOf(col.collectionName) !== -1);

_.each(appCollections, (appCollection) => {
  const remove = Meteor.wrapAsync(appCollection.remove, appCollection);
  remove({});
});
