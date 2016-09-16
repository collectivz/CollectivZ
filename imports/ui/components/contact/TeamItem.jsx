import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';

export default class TeamItem extends React.Component {

  render() {
    const {
      teamSelected
    } = this.props;

    return (
      <div>
        <h2>{teamSelected.name} '   ' {teamSelected.members}</h2>
      </div>
    );
  }
}

TeamItem.propTypes = {
  teamSelected: PropTypes.object.isRequired,
};
