import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import xhr from 'xhr';
// import aws from 'aws-sdk';

export default React.createClass({
  getInitialState () {
    return {
      preview: '',
    }
  },
  uploadFile(file, signedRequest, url){
    const xhr = new XMLHttpRequest();
    xhr.open('PUT', signedRequest);
    xhr.onreadystatechange = () => {
      if(xhr.readyState === 4){
        if(xhr.status === 200){
          console.log('request accepted.');
          Meteor.call('users.changeAvatar', url, (err, res) => {
            if (err)
              return;
            this.replaceState({});
          });
        }
        else{
          console.log('Could not upload file.');
        }
      }
    };
    xhr.send(file);
  },
  handleSubmit(){
    this.uploadFile(this.state.file, this.state.signedRequest, this.state.url);
  },
  handleOnChange(e){
    e.preventDefault();
    const files = e.target.files;
    const file = files[0];
    if (file) {
      let reader = new FileReader();
      reader.onload = (function(that) {
            return function(e) {
              that.setState({
                preview: e.target.result
              })
            };
        })(this);
      reader.readAsDataURL(file);

      Meteor.call('requestAwsSignature', file.name, file.type, (err, res) => {
        if (err) {
          console.log(err);
          return;
        }
        this.setState({
          file: file,
          signedRequest: res.signedRequest,
          url: res.url,
        })
      });
    }
  },
  render: function(){
    return (
      <div className="update-avatar-wrapper">
        <p>Changer votre image de profil</p>
        <input type="file" onChange={this.handleOnChange}/>
        <div className="preview">
          {this.state.preview ? <img src={this.state.preview}/> : '' }
        </div>
        {this.state.preview ? <input type="submit" onClick={this.handleSubmit}/> : '' }
      </div>
      );
  }
});

// export default class UploadPicture extends React.Component {
//
//   constructor(props) {
//     super(props);
//
//     this.uploadPicture = this.uploadPicture.bind(this);
//   }
//
//   uploadPicture() {
//     const s3 = new aws.S3();
//
//     const params = {
//       Bucket: 'collectivz-bucketz',
//       Key
//     };
//   }
//
//   render() {
//     return (
//       <div className="update-avatar-wrapper">
//         <input type="file" onChange={this.uploadPicture}/>
//       </div>);
//   }
// }
