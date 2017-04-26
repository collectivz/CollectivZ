import React, { Component, PropTypes } from "react";
import { Meteor } from "meteor/meteor";
import { _ } from "meteor/underscore";
import xhr from "xhr";

import { Toast } from "../helpers/Toast.js";
import { closeModal } from "../helpers/Modal.js";

export default class UploadPicture extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      preview: props.data ? props.data.imageUrl : null,
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
      preview,
    } = this.state;

    Meteor.call(method, data._id, preview, (err, res) => {
      if (err) {
        Toast(err.reason, "danger");
      } else {
        Toast("Modification prise en compte", "success");
        this.setState({
          file: null,
          signedRequest: null,
          url: ""
        });
        closeModal();
      }
    });
  }

  uploadPicture(e) {
    e.preventDefault();
    const self = this
    let file = e.target.files[0];
    const cloudName = process.env.CLOUDINARY_CLOUD_NAME

    Cloudinary.upload(file, (err, res) => {
      if (err)
        console.log(err)
      else {
        const url = `http://res.cloudinary.com/${cloudName}/image/upload/c_crop,g_auto:face,h_500,q_auto,r_max,w_500,x_0,y_0/a_0/v1493225078/${res.public_id}`
        self.setState({
          preview: url
        })
      }
    })
  }

  render() {
    const {
      preview
    } = this.state;

    return (
      <div className="update-avatar-wrapper">
        {preview
          ? <img className="modal--big-img circle-img" src={preview} />
          : ""}
        <input type="file" onChange={this.uploadPicture} />
        <button
          className="button self-center success"
          onClick={this.submitPicture}
        >
          Valider
        </button>
      </div>
    );
  }
}
