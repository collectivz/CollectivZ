import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { underscore } from 'meteor/underscore';
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
  }
});
