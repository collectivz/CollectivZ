import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import UploadPicture                            from './UploadPicture.jsx';

export default class UserHeader extends Component {

  render() {

    const { user } = this.props;

    return (
      <div style={{ backgroundImage: `url('${user.profile.background}')` }} className="profile">
        {/*
        // Linker l'upload de picture au src de l'img du profil pour voir en direct
        // le changement
        <UploadPicture data={user} method="users.changeAvatar"/>*/}
          <div className="profile-header">
              <img src={user.imageUrl}/>
              <h3>{user.username}</h3>
          </div>
      </div>
    );
  }

}
