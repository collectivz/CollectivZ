import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';

export default class InvitationRecevedItem extends React.Component {
  constructor(props) {
    super(props);

    this.acceptInvite = this.acceptInvite.bind(this);
    this.refuseInvite = this.refuseInvite.bind(this);
  }

  acceptInvite() {
    Meteor.call('repertory.acceptInvite', this.props.userSelected._id);
  }

  refuseInvite() {
    Meteor.call('repertory.refuseInvite', this.props.userSelected._id);
  }

  render() {
    const {
      userSelected
    } = this.props;

    return (
      <div>
        <h2>Vous avez reçu une invitation de {userSelected.username}
        <button onClick={this.acceptInvite}>Accepter</button>
        <button onClick={this.refuseInvite}>Refuser</button>
        </h2>
      </div>
    );
  }
}

InvitationRecevedItem.propTypes = {
  userSelected: PropTypes.object.isRequired,
};
