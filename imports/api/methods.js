import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { underscore } from 'meteor/underscore';
import { Chans, Msgs, Guilds, Polls } from './collections';
import aws  from 'aws-sdk';

Meteor.methods({
  requestAwsSignature(fileName, fileType) {
    if (!this.userId) {
      throw new Meteor.Error('not-logged-in',
        'Must be logged in to send message.');
    }

    check(fileName, String);
    check(fileType, String);
    aws.config.region = 'eu-central-1';
    aws.config.signatureVersion = 'v4';
    const s3 = new aws.S3();
    const S3_BUCKET = 'app-99';

    let returnData;
    const s3Params = {
      Bucket: S3_BUCKET,
      Key: fileName,
      Expires: 60,
      ContentType: fileType,
      ACL: 'public-read'
    };

    s3.getSignedUrl('putObject', s3Params, (err, data) => {
      if(err){
        return err;
      }
      returnData = {
        signedRequest: data,
        url: `https://${S3_BUCKET}.s3.eu-central-1.amazonaws.com/${fileName}`
      };
      return returnData;
    });

    return returnData;
  },
  newMessage(message) {                                   // add a new message in a chan
    if (!this.userId) {                                   // var message contain text, Id
      throw new Meteor.Error('not-logged-in',             // from chan and a type
        'Must be logged in to send message.');
    }

    check(message, {                                      // verify message if he
      text: String,                                       // does contain a text, a chan and a type
      chanId: String,
      type: Match.Maybe(String)
    });

    message.timestamp = new Date();                       // add a timestamp and a author to him
    message.userId = this.userId;
    console.log(message);
    return Msgs.insert(message);                                 // push into the Db
    },

  editMessage(newText, messageId) {
    if (!this.userId) {
      throw new Meteor.Error('not-logged-in',
        'Must be logged in to send message.');
    }
    const oldMessage = Msgs.findOne(messageId);
    if (this.userId !== oldMessage.userId) {
      throw new Meteor.Error('not-allowed-to',
      'You can only edit your own messages.');
    }
    Msgs.update(messageId, {$set: { text: newText}});
  },

  newChan(chan, fatherChanId) {                           // create a chan in a guilde
    if (!this.userId) {                                   // log check
      throw new Meteor.Error('not-logged-in',
        'Must be logged in to create a chat.');
    }
                                                          // var chan contain his depth,
    check(fatherChanId, String);                          // and a title
    check(chan, {
      title: String,
      depth: Number,
    });

    const userId = [];
    userId.push(this.userId);

    let fatherChan = {};
    if (fatherChanId) {
      if (chan.depth > 1) {
        fatherChan = Chans.findOne(fatherChanId);
      }
      else {
        fatherChan = Guilds.findOne(fatherChanId);
      }
      if (!_.contains(fatherChan.privilegedMembers, this.userId)) { // check rights
        throw new Meteor.Error('not-allowed-to',
        'Must have the right to do so.');
      }
    } else {
      throw new Meteor.Error('no-father',                           // check father
      'Every chan should have a father');
    }

    chan.author = this.userId;                                       // add author source, connections, rights
    chan.sourceId = fatherChanId;
    chan.wallet = 0,
    chan.connections = {
      memberCount: 0,
      pollCount: 0,
      challengeCount: 0,
      walletCount: 0,
      chanCount: 0
    };
    chan.privilegedMembers = [];
    chan.privilegedMembers.push(this.userId);
    chan.adhesionRequest = [];

    fatherChan.connections.chanCount += 1;
    if (chan.depth > 1) {
      Chans.update(fatherChanId, {
        $inc: {'connections.chanCount' : 1}
      });
    }
    else {
      Guilds.update(fatherChanId, {
        $inc: {'connections.chanCount' : 1}
      });
    }
    return Chans.insert(chan);                                              // insert in the Db
  },

  newGuild(guild) {
    if (!this.userId) {                                   // log check
      throw new Meteor.Error('not-logged-in',
        'Must be logged in to create a guild.');
    }

    check(guild, {                                        // the guild var contain a name
      name: String,                                       // an array of interest
    });

    if (Guilds.findOne({name: guild.name}))
    {
      throw new Meteor.Error('already exist',
        'There is already a guild with this name.');
    }

    guild.depth = 0;
    guild.wallet = 0;
    guild.author = this.userId;
    guild.xp = 0;
    guild.level = 0;
    guild.interest = [],                                 // and an array of grade available
    guild.gradeAvailable = [],
    guild.connections = {
      memberCount: 0,
    };
    guild.privilegedMembers = [""];
    guild.privilegedMembers.push(this.userId);
    guild.adhesionRequest = [];
    guild.chanConnected = "";

    const chan = {
      title: guild.name,
      depth: 1,
    }
    const fatherChanId = Guilds.insert(guild);
    const chanId = Meteor.call("newChan", chan, fatherChanId);
    Guilds.update(fatherChanId, {
      $set: {chanConnected: chanId}
    });
  },

  joinGuild(guildId) {
    if (!this.userId) {                                   // log check
      throw new Meteor.Error('not-logged-in',
        'Must be logged in to join a guild.');
    }

    check(guildId, String);
    const guild = Guilds.findOne(guildId)
    const user = Meteor.users.findOne(this.userId);
    if (!guild)
    {
      throw new Meteor.Error('does not exist',
        'There is no guild corresponding');
    } else if (_.contains(user.subscribedGuildes, guildId)) {
      throw new Meteor.Error('already joined',
        'Youve already joined this guild');
    }

    if (user) {
      Meteor.users.update(this.userId,
        { $push: { subscribedGuildes : guildId } },
        { $inc: {'connections.guildesCount' : 1} }
      );
    }
    else {
      throw new Meteor.Error('user-not-found',
        'User not found.');
    }

    Guilds.update(guildId, {
      $inc: {'connections.memberCount' : 1}
    });
  },

  joinChan(chanId) {
    if (!this.userId) {                                   // log check
      throw new Meteor.Error('not-logged-in',
        'Must be logged in to join a chan.');
    }

    check(chanId, String);
    const chan = Chans.findOne(chanId)
    if (!chan)
    {
      throw new Meteor.Error('does not exist',
        'There is no chan corresponding');
    } else if (_.contains(user.subscribedChannels, chanId)) {
        throw new Meteor.Error('already joined',
          'Youve already joined this chan');
    }

    const user = Meteor.users.findOne(this.userId);
    if (user) {
      Meteor.users.update(this.userId,
        { $push: { subscribedChannels : guildId } },
        { $inc: {'connections.chansCount' : 1} }
      );
    }
    else {
      throw new Meteor.Error('user-not-found',
        'User not found.');
    }

    Chans.update(chanId, {
      $inc: {'connections.memberCount' : 1}
    });
  },

  newPoll(message, choice) {

    check(message, {                                      // verify message if he
      text: String,                                       // does contain a text, a chan and a type
      chanId: String,
      type: Match.Maybe(String)
    });


    // this part check the logged, the info entered (chanId and type)
    // and the rights
    if (!this.userId) {
      throw new Meteor.Error('not-logged-in',
      'Must be logged in to create a poll.');
    }
    else if (type !== "poll") {
      throw new Meteor.Error('not-good-type',
        'Message is wrong typed.');
    }

    const fatherChan = Chans.findOne(fatherChanId);
    if (fatherChan) {
      if (!_.contains(fatherChan.privilegedMembers, this.userId)) { // check rights
        throw new Meteor.Error('not-allowed-to',
        'Must have the right to do so.');
      }
    } else {
      throw new Meteor.Error('no-chan-defined',
      'The message don\'t belong to any chan');
    }

    const messageFatherId = Meteor.call("newMessage", message);
    const newPoll = {
      messageFatherId: messageFatherId,
      finished: 0,
      chanId: message.chanId,
    };
    polldId = Polls.insert(newPoll);

    // there is two type of poll, one where the user enter is own prop
    // and the other at "default" where there is for and against prop
    // this build the array where the count of vote is comptabilized with the
    // corresponding prop

    if (choice) {
      choice.forEach((proposition) => {
        Meteor.call("createProp", proposition, pollId);
      })
    } else {
      Meteor.call("createProp", "for", pollId);
      Meteor.call("createProp", "against", pollId);
    }

    Chans.update(fatherChanId, {
      $inc: ('connections.pollsCount': 1)
    });
  },

  voteForAPoll(pollId, propsId, chanId) {

    check(pollId, String);
    check(propsId, String);
    check(chanId, String);

    // this part check the logged, the info entered (chanId and type)
    // and the rights
    if (!this.userId) {
      throw new Meteor.Error('not-logged-in',
      'Must be logged in to create a poll.');
    }

    const poll = Polls.findOne(pollId);
    if(!poll) {
      throw new Meteor.Error('no-poll',
      'The poll does not exist');
    } else if (poll.finished == 1) {
      throw new Meteor.Error('poll already finished',
      'The poll is finished');
    }

    const fatherChan = Chans.findOne(chanId);
    if (fatherChan) {
      if (!_.contains(fatherChan.privilegedMembers, this.userId)) { // check rights
        throw new Meteor.Error('not-allowed-to',
        'Must have the right to do so.');
      }
    } else {
      throw new Meteor.Error('no-chan-defined',
      'The poll don\'t belong to any chan');
    }

    const props = Props.find({pollId: pollId}).fetch();
    props.forEach((proposition) => {
      if (_.contains(props.voteRecevedFrom, this.userId)) {
        throw new Meteor.Error('already voted',
        'You\'ve alreday voted for this poll');
      }
    })

    Props.update(propsId, {
      $push: {voteRecevedFrom: this.userId},
    });
  },

  createProp(proposition, pollId) {

    const prop = {
      name: proposition,
      voteRecevedFrom: [],
      pollId: pollId
    }

    return Props.insert(prop);
  }
});
