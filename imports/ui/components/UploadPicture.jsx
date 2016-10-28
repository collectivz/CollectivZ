import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import smartcrop from 'smartcrop';
import xhr from 'xhr';

import { Toast } from '../helpers/Toast.js';
import { closeModal } from '../helpers/Modal.js';

export default class UploadPicture extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      preview: props.data ? props.data.imageUrl : null,
      file: null,
      signedRequest: null,
      url: ''
    };

    this.uploadPicture = this.uploadPicture.bind(this);
    this.submitPicture = this.submitPicture.bind(this);
  }

  submitPicture() {
    const {
      data,
      method
    } = this.props;
    const {
      file,
      signedRequest,
      url
    } = this.state;

    if (file && signedRequest) {
      const xhr = new XMLHttpRequest();
      xhr.open('PUT', signedRequest);
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            Meteor.call(method, data._id, url, (err, res) => {
              if (err) {
                Toast(err.reason, 'danger');
              } else {
                Toast("Modification prise en compte", "success")
                this.setState({
                  file: null,
                  signedRequest: null,
                  url: ''
                });
                closeModal();
              }
            });
          } else {
            console.log('Could not upload file.');
          }
        }
      };
      xhr.send(file);
    }
  }

  uploadPicture(e) {
    e.preventDefault();
    let file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = ((self) => {
        return function(e) {
          const img = new Image();
          img.src = e.target.result;
          console.log(img)
          self.setState({
            preview: e.target.result
          });
        };
      })(this);

      if (file.type.split('/')[0] !== 'image') {
        console.log('not an image');
      }

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
        });
      });
    }
  }

  render() {
    const {
      preview
    } = this.state;

    return (
      <div className="update-avatar-wrapper">
        <input type="file" onChange={this.uploadPicture}/>
        {
          preview ?
            <img src={preview} />
          : ''
        }
        <button className="button success" onClick={this.submitPicture}>Valider</button>
      </div>);
  }
}
