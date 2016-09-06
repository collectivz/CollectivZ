import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';

export default class ContactItem extends React.Component {

  render() {
    const {
      userSelected
    } = this.props;

    return (
      <div>
        <h2>{userSelected.profile.avatar} '   ' {userSelected.username}</h2>
      </div>
    );
  }
}

ContactItem.propTypes = {
  userSelected: PropTypes.object.isRequired,
};
