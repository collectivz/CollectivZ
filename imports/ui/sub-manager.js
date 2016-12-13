import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import { ReactiveVar } from 'meteor/reactive-var';

import * as TYPES from './constants/constants';
import Store from './store/store';
import { ddpAction } from './actions/PublicProfile';

export default Subscriptions = {
  map: new ReactiveVar({}),
  add(publishName, query = '', callback) {
    const subs = this.map.get();

    subs[publishName] = {
      query,
      callback,
      handle: null
    };
    this.map.set(subs);
  },
  stop(publishName) {
    const subs = this.map.get();

    if (subs[publishName]) {
      subs[publishName].handle.stop();
      subs[publishName].handle = null;
      subs[publishName].query = null;
      subs[publishName].callback = null;
      delete subs[publishName];

      this.map.set(subs);
    }
  },
  isReady(publishName) {
    const subs = this.map.get();

    if (subs[publishName]) {
      return subs[publishName].handle.ready();
    }
    return false;
  }
};

Tracker.autorun(() => {
  const map = Subscriptions.map.get();
  Object.keys(map).forEach(publishName => {
    map[publishName].handle = Meteor.subscribe(publishName, map[publishName].query, {
      onReady() {
        map[publishName].callback.call();
        console.log(`sub ${publishName} ready`);
      },
      onStop() {
        console.log(`sub ${publishName} stopped`);
      }
    });
  });

});


const DDPConnection = Meteor.connection;
const reactiveStores = {};

DDPConnection._stream.on('message', (msg) => {
  const msgObj = JSON.parse(msg);
  const collectionName = msgObj.collection;
  if (msgObj.collection && msgObj.collection !== 'meteor_autoupdate_clientVersions') {
    const packetToProcess = { ...msgObj, collection: collectionName };
    switch (packetToProcess.msg) {
      case 'added':
      Store.dispatch(ddpAction(TYPES.COLLECTION_ADDED, packetToProcess));
      break;
      case 'removed':
      Store.dispatch(ddpAction(TYPES.COLLECTION_REMOVED, packetToProcess));
      break;
      case 'changed':
      Store.dispatch(ddpAction(TYPES.COLLECTION_CHANGED, packetToProcess));
      break;
      case 'replace':
      Store.dispatch(ddpAction(TYPES.COLLECTION_REPLACE, packetToProcess));
      break;
      default:
      break;
    }
  }
});
