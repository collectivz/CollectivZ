import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { Link } from 'react-router';

export default class InvitationRecevedItem extends React.Component {
  render() {
    const {
      userSelected
    } = this.props;

    return (
      <div>
        <h2>Vous avez reçu une invitation de {userSelected.username}</h2>
      </div>
    );
  }
}

InvitationRecevedItem.propTypes = {
  userSelected: PropTypes.object.isRequired,
};
