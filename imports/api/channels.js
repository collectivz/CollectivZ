// import { Meteor } from 'meteor/meteor';
// import { Mongo } from 'meteor/mongo';
//
// let id;
//
// if (Meteor.isServer) {
//   Meteor.startup(() => {
//
//     if (Channels.find().count() === 0) {
//       id = Channels.insert({
//         type: 'guilde',
//         sourceId: null,
//         sourcePreview: null,
//         preview: {
//           name: 'Collectivz',
//           description: 'Just a team for now'
//         },
//       });
//     }
//
//     if (Messages.find().count() === 0) {
//       let chan = Channels.findOne({ _id: id });
//       // Messages.insert({
//       //
//       // }),
//     }
//   });
// }
