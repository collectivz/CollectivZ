import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

import { Channels } from '../channels/collection';
import { Collections } from '../collection-handler';

class ArchiveCollection extends Mongo.Collection {
  insert(archive, callback) {

    Collections[archive.type].remove(archive._id);

    super.insert(archive, callback);
  }
}

export let Archives = new ArchiveCollection('archives');

Archives.addToArchive = (item) => {
  const count = `connections.${item.type}Count`;

  if (item.type !== 'channel') {
    Channels.update(item.channelId, {
      $inc: { [count]: -1 }
    });
  } else if (item.type === 'channel') {
    const hasChildren = Channels.find({parentId: item._id}).count();

    if (hasChildren) {
      throw new Meteor.Error('has-children',
        "Cette action contient des sous-actions, vous ne pouvez l'archiver.");
    }
    Channels.update(item.parentId, {
      $inc: { [count]: -1 }
    });
    Meteor.users.update(
      { _id: { $in: item.members } },
      { $pull: { subscribedChannels: item._id } }
    );
    item.channelId = item.parentId;
  }

  Archives.insert(item);
};

if (Meteor.isClient) {
  window.Archives = Archives;
}
