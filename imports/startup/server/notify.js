import { Meteor } from 'meteor/meteor';

export function publish (data) {
    var notificationObj = { app_id: "88cf61ed-a0b2-4303-98c6-114bb0991ddb", ...data}
    var headers = {
        "Content-Type": "application/json; charset=utf-8",
        "Authorization": "Basic NGEwMGZmMjItY2NkNy0xMWUzLTk5ZDUtMDAwYzI5NDBlNjJj"
    };

    var options = {
        host: "onesignal.com",
        port: 443,
        path: "/api/v1/notifications",
        method: "POST",
        headers: headers
    };

    var https = require('https');
    var req = https.request(options, function(res) {
        res.on('data', function(notificationObj) {
            console.log("Response:");
            console.log(JSON.parse(notificationObj));
        });
    });

    req.on('error', function(e) {
        console.log("ERROR:");
        console.log(e);
    });

    req.write(JSON.stringify(notificationObj));
    req.end();
}

Meteor.methods({
    'channelNotification': function (channel, text) {
        const notificationObj = { contents: { en: text }, included_segments: ['all'] };

        publish( notificationObj);
    },
    'userNotification': function (text, userId) {
        const notificationObj = { contents: { en: text }, include_player_ids: userId };

        publish( notificationObj);
    }
});
