import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";
import { _ } from "meteor/underscore";
import { Accounts } from "meteor/accounts-base";

import { Channels } from "../channels/collection.js";
import { Messages } from "../messages/collection.js";
import { Notify } from '../notify';

Meteor.methods({
  "buddies.inviteToChannel": function(mailOrUsername, channelId) {
    check(mailOrUsername, String);
    check(channelId, String);

    if (!this.userId) {
      throw new Meteor.Error(
        "not-logged-in",
        "Vous devez être connecté pour inviter un ami."
      );
    }
    const friend = Accounts.findUserByUsername(mailOrUsername) ||
      Accounts.findUserByEmail(mailOrUsername);

    if (!friend) {
      throw new Meteor.Error(
        "user-not-found",
        "Le mail renseigné ne correspond à aucun utilisateur."
      );
    }
    const channel = Channels.findOne(channelId)
    if (channel) {
      Meteor.users.update(friend, { $push: { subscribedChannels: channelId } });
      Channels.update(channelId, {
        $push: { members: friend._id }
      });
      const msg = {
        text: `L'utilisateur ${friend.username} vient d'être ajouté au groupe. Dites hola !`,
        channelId
      };
      Messages.insert(msg);
      const text = `${friend.username} vous a ajouté au groupe "${channel.name}"`
      Notify.ids(text, [friend.mobileId.userId])
      //
      // const user = Meteor.users.findOne(friend._id);
      // Meteor.call(
      //   "userNotification",
      //   "Invitation au groupe " + Channels.findOne(channelId).name,
      //   user.mobileId.userId
      // );

    } else {
      throw new Meteor.Error("channel-not-found", "Channel non trouvé.");
    }
  }
});
