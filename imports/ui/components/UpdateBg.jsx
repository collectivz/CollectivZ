import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import ReactDOM from 'react-dom';
import xhr from 'xhr';

import './UpdateBg.css';

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
          Meteor.call('users.changeBackground', url, (err, res) => {
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
      <div className="update-bg-wrapper">
        <p>Select new background image</p>
        <input type="file" onChange={this.handleOnChange}/>
        <div className="preview">
          {this.state.preview ? <img src={this.state.preview}/> : '' }
        </div>
        {this.state.preview ? <input type="submit" onClick={this.handleSubmit}/> : '' }
      </div>
      );
  }
});
