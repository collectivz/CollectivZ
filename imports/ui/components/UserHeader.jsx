import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import UploadPicture                            from './UploadPicture.jsx';

export default class UserHeader extends Component {

  render() {

    const { user } = this.props;

    return (
      <div className="profile">

        {/*
          style={{ backgroundImage: `url('${user.profile.background}')` }}
          // Linker l'upload de picture au src de l'img du profil pour voir en direct
          // le changement
          <UploadPicture data={user} method="users.changeAvatar"/>
        */}
          <div className="profile-header">
              <div className="circle">
                <img className="photo" src={user.imageUrl}/>
                <i className="edit icon icon-pencil"></i>
              </div>
              <h3 className="name">{user.username}</h3>
              <h5 className="attribute">{(user.hero && user.hero.title) ? user.hero.title : ""}</h5>
          </div>
      </div>
    );
  }

}
