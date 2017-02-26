import { Meteor } from "meteor/meteor";
import { Email } from "meteor/email";
import { check } from "meteor/check";
import { Random } from "meteor/random";

import { Collections } from "../collection-handler";
import { Heroes } from "../heroes/heroes";
import { Channels } from "../channels/collection.js";
import { Messages } from "../messages/collection.js";

Meteor.methods({
  "users.changeAvatar": function(userId, url) {
    if (!this.userId) {
      throw new Meteor.Error(
        "not-logged-in",
        "Vous devez être connecté pour changer d'avatar."
      );
    }

    check(url, String);
    check(userId, String);

    if (this.userId !== userId && !Meteor.user().isAdmin) {
      throw new Meteor.Error(
        "wrong user",
        "Vous ne pouvez pas changer l'image d'une autre personne."
      );
    }

    Meteor.users.update(userId, {
      $set: { imageUrl: url }
    });
    Messages.update(
      { author: userId },
      {
        $set: { authorImage: url }
      },
      { multi: true }
    );
  },

  "users.changeBackground": function(url) {
    const userId = this.userId;

    if (!userId) {
      throw new Meteor.Error(
        "not-logged-in",
        "Vous devez être connecté pour changer d'avatar."
      );
    }

    check(url, String);

    Meteor.users.update(userId, {
      $set: { "profile.background": url }
    });
  },

  "users.updateLastRead": function(channelId) {
    const userId = this.userId;

    if (!userId) {
      throw new Meteor.Error(
        "not-logged-in",
        "Vous devez être connecté pour changer d'avatar."
      );
    }
    check(channelId, String);

    const lastReadField = `lastReadAt.${channelId}`;
    Meteor.users.update(userId, {
      $set: { [lastReadField]: Date.now() }
    });
  },

  "users.changeInfos": function(userDoc) {
    if (!this.userId) {
      throw new Meteor.Error(
        "not-logged-in",
        "Vous devez être connecté pour changer de nom d'utilisateur."
      );
    }
    new SimpleSchema({
      username: {
        type: String,
        optional: true
      },
      firstname: {
        type: String,
        optional: true
      },
      lastname: {
        type: String,
        optional: true
      },
      email: {
        type: String,
        optional: true
      },
      phone: {
        type: String,
        optional: true
      }
    }).validate(userDoc);

    const {
      email,
      username,
      firstname,
      lastname,
      phone
    } = userDoc;
    const update = {
      $set: {}
    };

    if (email) {
      Accounts.addEmail(this.userId, email);
    }

    if (username) {
      Accounts.setUsername(this.userId, username);
    }
    if (firstname) {
      update.$set["profile.firstName"] = firstname;
    }
    if (lastname) {
      update.$set["profile.lastName"] = lastname;
    }
    if (phone) {
      update.$set.phone = phone;
    }

    if (!_.isEmpty(update.$set)) {
      Meteor.users.update(this.userId, update);
    }
  },

  "users.getUserNumber": function() {
    return Meteor.users.find().count();
  },

  "users.addSkill": function(newSkill) {
    if (!this.userId) {
      throw new Meteor.Error(
        "not-logged-in",
        "Vous devez être connecté pour changer de nom d'utilisateur."
      );
    }
    check(newSkill, String);

    Meteor.users.update(this.userId, {
      $addToSet: { skills: newSkill }
    });
  },

  "users.removeSkill": function(skill) {
    if (!this.userId) {
      throw new Meteor.Error(
        "not-logged-in",
        "Vous devez être connecté pour changer de nom d'utilisateur."
      );
    }
    check(skill, String);

    Meteor.users.update(this.userId, {
      $pull: { skills: skill }
    });
  },

  "users.pickHero": function(heroImg) {
    if (!this.userId) {
      throw new Meteor.Error(
        "not-logged-in",
        "Vous devez être connecté pour changer de nom d'utilisateur."
      );
    }
    check(heroImg, String);
    const hero = Heroes.find(hero => {
      if (hero.image === heroImg) {
        return true;
      }
    });

    Meteor.users.update(this.userId, {
      $set: { hero }
    });
  },

  "users.lostPassword": function(email) {
    check(email, String);

    const user = Accounts.findUserByEmail(email);
    if (user) {
      const newPassword = Random.id(8);
      Accounts.setPassword(user._id, newPassword);
      Email.send({
        to: user.emails[0].address,
        from: "postmaster@www.collectivz.com",
        subject: "Votre nouveau mot de passe CollectivZ",
        text: `Bonjour
        Vous avez demandé à ce que votre mot de passe soit réinitialisé.
        Votre nouveau mot de passe est :
        ${newPassword}
        A bientôt !`
      });
    } else {
      throw new Meteor.Error(
        "user-not-found",
        "Le mail spécifié n'a pas été trouvé."
      );
    }
  },

  "users.getUsernames": function(username) {
    const parts = username.trim().split(/[ \-\:]+/);
    const regex = new RegExp(`(${parts.join(" ")})`, "ig");

    const users = Meteor.users
      .find({ username: { $regex: regex } }, {
        fields: { username: 1 }
      })
      .fetch();

    return users;
  },

  "users.blockUser"(userIdToBlock) {
    const userId = Meteor.userId();

    Meteor.users.update(userId, {
      $addToSet: { blockedUsers: userIdToBlock }
    });
  },

  "users.unblockUser"(userIdToUnblock) {
    const userId = Meteor.userId();

    Meteor.users.update(userId, {
      $pull: { blockedUsers: userIdToUnblock }
    });
  },

  "users.reportContent"(contentId, contentType) {
    if (Collections[contentType]) {
      const content = Collections[contentType].findOne(contentId);

      if (content) {
        Collections[contentType].update(content._id, {
          $set: { objectionable: true }
        });
        const badUser = Meteor.users.findOne(content.author);
        Email.send({
          to: "philippe.decrat@gmail.com",
          from: "postmaster@www.collectivz.com",
          subject: "Un grand méchant requiert une action de Zorro !",
          text: `L'utilisateur ${badUser.username} (id: ${badUser._id}) a été signalé pour contenu inapprioprié. Nuke the fucker.`
        });
      }
    }
  }
});
