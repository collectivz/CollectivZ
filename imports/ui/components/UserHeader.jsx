import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';

import UploadPicture                            from './UploadPicture.jsx';
import { openModal } from '../helpers/Modal';

export default class UserHeader extends Component {

  constructor(props) {
    super(props);

    this.openAvatarModal = this.openAvatarModal.bind(this);
  }

  openAvatarModal() {
    const {
      user
    } = this.props;
    const component = <UploadPicture data={user} method="users.changeAvatar" />;

    openModal(component, "Modifer votre avatar");
  }

  render() {

    const { user } = this.props;

    return (
      <div className="profile">

          <div className="profile-header">
              <div className="circle">
                <img className="photo" src={user.imageUrl}/>
                <i className="edit icon icon-pencil" onClick={this.openAvatarModal}></i>
              </div>
              <h3 className="name">{user.username}</h3>
              <h5 className="attribute">{(user.hero && user.hero.title) ? user.hero.title : ""}</h5>
          </div>
      </div>
    );
  }

}
