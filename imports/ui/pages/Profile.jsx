import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import ReactDOM from 'react-dom';
import xhr from 'xhr';

export default React.createClass({
  handleThatEvent: function(e){
    e.preventDefault();
    Meteor.logout();
  },
  uploadFile(file, signedRequest, url){
    console.log(url);
    const xhr = new XMLHttpRequest();
    xhr.open('PUT', signedRequest);
    xhr.onreadystatechange = () => {
      if(xhr.readyState === 4){
        if(xhr.status === 200){
          // document.getElementById('preview').src = url;
          console.log('request accepted.');
          Meteor.users.update(Meteor.user()._id, {$set: { 'profile.avatar': url}})

          // document.getElementById('avatar-url').value = url;
        }
        else{
          console.log('Could not upload file.');
        }
      }
    };
    xhr.send(file);
  },
  handleOnChange(e){
    e.preventDefault();
    const files = document.getElementById('file-input').files;
    const file = files[0];
    if (file) {
      Meteor.call('requestAwsSignature', file.name, file.type, (err, res) => {
        if (err) {
          console.log(err);
          return;
        }
        this.uploadFile(file, res.signedRequest, res.url);
      });
    }
  },
  render: function(){
    return (
      <div className="view-container">
        <p>fzeafzaefzaezfea</p>
        <input id="file-input" type="file" onChange={this.handleOnChange}/>
        <button onClick={this.handleThatEvent}>logout</button>
        <img src={Meteor.user().profile.avatar}/>
      </div>
      );
  }
});
