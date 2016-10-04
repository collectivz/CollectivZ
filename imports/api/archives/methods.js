import { Meteor } from 'meteor/meteor';

import { Archives } from './archives.js';
import { Collections } from '../collection-handler';

Meteor.methods({
  'archives.addToArchive'(itemId, itemType) {
    if (!this.userId) {
      throw new Meteor.Error('not-logged-in',
        "Vous devez être connecté pour archiver quelque chose.");
    }
    check(itemId, String);
    check(itemType, String);

    const item = Collections[itemType].findOne(itemId);
    if (!item) {
      throw new Meteor.Error('not-found',
        "L'objet spécifié est introuvable.");
    }
    if (item.author !== this.userId && !Meteor.user().isAdmin) {
      throw new Meteor.Error('no-right',
        "Vous n'avez pas les droits pour faire ça.");
    }

    Archives.addToArchive(item);
  }
});
