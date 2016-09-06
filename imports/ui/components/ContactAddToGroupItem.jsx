import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';

export default class ContactAddToGroupItem extends React.Component {

  render() {
    const {
      userSelected,
    } = this.props;

    return (
      <div>
        <h2>{userSelected.profile.avatar} '   ' {userSelected.username}
          <button onClick={this.props.addToNewGroup.bind(this, userSelected._id)}>Ajouter</button>
          <button onClick={this.props.removeFromNewGroup.bind(this, userSelected._id)}>Enlever</button>
        </h2>
      </div>
    );
  }
}

ContactAddToGroupItem.propTypes = {
  userSelected: PropTypes.object.isRequired,
};
